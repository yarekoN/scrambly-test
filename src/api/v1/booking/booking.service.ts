import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateBookingBodyDto } from './dto/create-booking.dto';
import { panic } from 'panic-fn';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { UserService } from '../user/user.service';
import { RoomService } from '../room/room.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class BookingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly roomService: RoomService,
    private readonly mailService: MailService,
  ) {}

  async create(data: CreateBookingBodyDto, requestorId: string) {
    const [user, room] = await Promise.all([
      this.userService.getById(requestorId),
      this.roomService.getByIdOrThrow(data.roomId),
    ]);

    const slot = await this.getSlotByInNOutTime(data);

    if (!slot) {
      panic(new BadRequestException('Wrong check-in or check-out time'));
    }

    {
      const existingSlotBooking = await this.prisma.booking.findFirst({
        where: { roomId: data.roomId, slotId: slot.id },
      });

      if (existingSlotBooking) {
        panic(new BadRequestException('Slot is not available'));
      }
    }

    const booking = await this.prisma.booking.create({
      data: {
        date: data.date,
        roomId: data.roomId,
        userId: requestorId,
        slotId: slot.id,
      },
      include: { slot: true },
    });

    this.mailService.sendSuccessfulBookingMail(user.email, room.id);

    return booking;
  }

  private async getSlotByInNOutTime(data: {
    checkIn: string;
    checkOut: string;
  }) {
    return this.prisma.slot.findFirst({
      where: { checkIn: data.checkIn, checkOut: data.checkOut },
    });
  }

  async listByUserId(requestorId: string) {
    return this.prisma.booking.findMany({
      where: { userId: requestorId },
      include: { slot: true },
    });
  }

  async getById(id: string) {
    return this.prisma.booking.findUnique({
      where: { id },
      include: { slot: true },
    });
  }

  async getByIdOrThrow(id: string, requestorId: string) {
    const booking = await this.getById(id);

    if (!booking) {
      panic(new NotFoundException('Booking not found'));
    }

    if (booking.userId !== requestorId) {
      panic(
        new ForbiddenException('You are not allowed to access this booking'),
      );
    }

    return booking;
  }

  async update(id: string, data: UpdateBookingDto, requestorId: string) {
    const existing = await this.getByIdOrThrow(id, requestorId);

    const slot = await this.getSlotByInNOutTime({ ...existing, ...data });

    if (!slot) {
      panic(new BadRequestException('Wrong check-in or check-out time'));
    }

    return this.prisma.booking.update({
      where: { id },
      data,
      include: { slot: true },
    });
  }

  async remove(id: string, requestorId: string) {
    await this.getByIdOrThrow(id, requestorId);

    await this.prisma.booking.delete({
      where: { id },
    });
  }
}

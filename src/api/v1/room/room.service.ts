import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { panic } from 'panic-fn';

@Injectable()
export class RoomService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.room.findMany();
  }

  async getById(id: string) {
    return this.prisma.room.findUnique({
      where: { id },
    });
  }

  async getByIdOrThrow(id: string) {
    const room = this.getById(id);

    if (!room) {
      panic(new NotFoundException('Room not found'));
    }

    return room;
  }

  async listFreeSlotsByRoomId(roomId: string) {
    await this.getByIdOrThrow(roomId);

    return await this.prisma.slot.findMany({
      where: {
        bookings: {
          none: {
            roomId,
          },
        },
      },
      select: { checkIn: true, checkOut: true },
    });
  }

  async getAvailabilityById(roomId: string) {
    await this.getByIdOrThrow(roomId);

    const freeSlots = await this.prisma.slot.findMany({
      where: {
        bookings: {
          none: {
            roomId,
          },
        },
      },
    });

    const isAvailable = freeSlots.length > 0;

    return { isAvailable };
  }

  async listSlotsByRoomId(roomId: string) {
    await this.getByIdOrThrow(roomId);

    const slots = await this.prisma.slot.findMany({
      include: { bookings: { where: { roomId } } },
    });

    return slots.map(({ checkIn, checkOut, bookings }) => ({
      checkIn,
      checkOut,
      isBooked: bookings.length > 0,
    }));
  }
}

import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { PrismaModule } from '../../../common/prisma/prisma.module';
import { MailModule } from '../mail/mail.module';
import { UserModule } from '../user/user.module';
import { RoomModule } from '../room/room.module';

@Module({
  controllers: [BookingController],
  imports: [PrismaModule, MailModule, UserModule, RoomModule],
  providers: [BookingService],
})
export class BookingModule {}

import { Module } from '@nestjs/common';
import { RoomModule } from './room/room.module';
import { UserModule } from './user/user.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [RoomModule, UserModule, BookingModule],
})
export class ApiV1Module {}

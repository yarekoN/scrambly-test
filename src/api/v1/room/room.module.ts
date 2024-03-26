import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { PrismaModule } from '../../../common/prisma/prisma.module';

@Module({
  controllers: [RoomController],
  imports: [PrismaModule],
  providers: [RoomService],
  exports: [RoomService],
})
export class RoomModule {}

import { Controller, Get, Param } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomIdParamDto } from './dto/room-id-param.dto';
import { ApiVersions } from '../../../common/openapi/api-version';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CacheTTL } from '@nestjs/cache-manager';

@Controller({ path: 'room', version: ApiVersions.First })
@ApiTags('Room')
@ApiBearerAuth('bearer')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get(':roomId/free-slots')
  listFreeSlotsByRoomId(@Param() { roomId }: RoomIdParamDto) {
    return this.roomService.listFreeSlotsByRoomId(roomId);
  }

  @Get(':roomId/slots')
  listSlotsByRoomId(@Param() { roomId }: RoomIdParamDto) {
    return this.roomService.listSlotsByRoomId(roomId);
  }

  @Get(':roomId/availability')
  getRoomAvailability(@Param() { roomId }: RoomIdParamDto) {
    return this.roomService.getAvailabilityById(roomId);
  }

  @Get()
  @CacheTTL(60000)
  findAll() {
    return this.roomService.findAll();
  }
}

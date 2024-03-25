import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomBodyDto } from './create-room.dto';

export class UpdateRoomDto extends PartialType(CreateRoomBodyDto) {}

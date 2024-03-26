import { PickType } from '@nestjs/swagger';
import { CreateBookingBodyDto } from './create-booking.dto';

export class UpdateBookingDto extends PickType(CreateBookingBodyDto, [
  'date',
  'checkIn',
  'checkOut',
]) {}

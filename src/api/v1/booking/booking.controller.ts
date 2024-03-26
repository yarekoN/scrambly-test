import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CacheTTL } from '@nestjs/cache-manager';
import { BookingService } from './booking.service';
import { CreateBookingBodyDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { ApiVersions } from '../../../common/openapi/api-version';
import { AuthGuard } from '../../common/guards/auth.guard';
import { BookingIdParamDto } from './dto/booking-id-param.dto';
import { UserInfo } from '../../common/decorators/user-info.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller({ path: 'booking', version: ApiVersions.First })
@ApiTags('Booking')
@ApiBearerAuth('bearer')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@UserInfo() user: UserInfo, @Body() body: CreateBookingBodyDto) {
    return this.bookingService.create(body, user.id);
  }

  @Get('my')
  @CacheTTL(60)
  @UseGuards(AuthGuard)
  findMyBookings(@UserInfo() user: UserInfo) {
    return this.bookingService.listByUserId(user.id);
  }

  @Get(':bookingId')
  @UseGuards(AuthGuard)
  findOneBooking(
    @UserInfo() user: UserInfo,
    @Param() { bookingId }: BookingIdParamDto,
  ) {
    return this.bookingService.getByIdOrThrow(bookingId, user.id);
  }

  @Patch(':bookingId')
  @UseGuards(AuthGuard)
  update(
    @UserInfo() user: UserInfo,
    @Param() { bookingId }: BookingIdParamDto,
    @Body() body: UpdateBookingDto,
  ) {
    return this.bookingService.update(bookingId, body, user.id);
  }

  @Delete(':bookingId')
  @UseGuards(AuthGuard)
  remove(
    @UserInfo() user: UserInfo,
    @Param() { bookingId }: BookingIdParamDto,
  ) {
    return this.bookingService.remove(bookingId, user.id);
  }
}

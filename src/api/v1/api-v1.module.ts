import { Module } from '@nestjs/common';
import { RoomModule } from './room/room.module';
import { UserModule } from './user/user.module';
import { BookingModule } from './booking/booking.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    RoomModule,
    UserModule,
    BookingModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
      global: true,
    }),
  ],
})
export class ApiV1Module {}

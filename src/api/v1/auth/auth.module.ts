import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [AuthController],
  imports: [UserModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}

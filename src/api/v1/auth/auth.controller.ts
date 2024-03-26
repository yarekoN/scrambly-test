import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiVersions } from '../../../common/openapi/api-version';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller({ path: 'auth', version: ApiVersions.First })
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: CreateUserDto) {
    return this.authService.signup(body);
  }

  @Post('login')
  async login(@Body() body: UserCredentialsDto) {
    return this.authService.login(body);
  }
}

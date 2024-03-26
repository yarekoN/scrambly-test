import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { panic } from 'panic-fn';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(data: CreateUserDto) {
    const existingUser = await this.userService.getByEmail(data.email);

    if (existingUser) {
      panic(new ConflictException('User is already registered'));
    }

    const createdUser = await this.userService.create(data);

    return this.forgeJWT(createdUser);
  }

  async login(credentials: UserCredentialsDto) {
    const user = await this.userService.getByCredentials(credentials);

    if (!user) {
      panic(new BadRequestException('Wrong email or password'));
    }

    return this.forgeJWT(user);
  }

  private async forgeJWT(user: User) {
    const payload = { sub: user.id, email: user.email, name: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

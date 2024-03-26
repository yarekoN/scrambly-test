import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { UserCredentialsDto } from '../auth/dto/user-credentials.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async getByCredentials(credentials: UserCredentialsDto) {
    return this.prisma.user.findUnique({
      where: { email: credentials.email, password: credentials.password },
    });
  }

  async getByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(data: CreateUserDto) {
    return this.prisma.user.create({
      data,
    });
  }
}

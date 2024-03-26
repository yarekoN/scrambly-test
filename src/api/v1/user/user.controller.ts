import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiVersions } from '../../../common/openapi/api-version';
import { AuthGuard } from '../../common/guards/auth.guard';
import { UserInfo } from '../../common/decorators/user-info.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller({ path: 'user', version: ApiVersions.First })
@ApiTags('User')
@ApiBearerAuth('bearer')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('myself')
  @UseGuards(AuthGuard)
  getMyself(@UserInfo() user: UserInfo) {
    return this.userService.getById(user.id);
  }
}

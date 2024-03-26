import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export type UserInfo = {
  id: string;
  email: string;
  name: string;
};

export const UserInfo = createParamDecorator(
  (data: never, ctx: ExecutionContext): UserInfo => {
    const request = ctx.switchToHttp().getRequest();
    return {
      id: request?.user?.sub,
      email: request?.user?.email,
      name: request?.user?.name,
    };
  },
);

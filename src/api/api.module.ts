import { Module } from '@nestjs/common';
import { ApiV1Module } from './v1/api-v1.module';
import { ApiNeutralModule } from './neutral/api-neutral.module';
import { RedisCacheModule } from './common/cache/redis-cache.module';

@Module({
  imports: [ApiNeutralModule, ApiV1Module, RedisCacheModule],
})
export class ApiModule {}

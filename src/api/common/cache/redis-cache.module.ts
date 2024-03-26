import { Module, Global } from '@nestjs/common';
import * as redisStore from 'cache-manager-ioredis';
import { ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
        password: configService.get('REDIS_PASSWORD'),
        ttl: configService.get('CACHE_TTL'),
      }),
      inject: [ConfigService],
      isGlobal: true,
    }),
  ],
})
export class RedisCacheModule {}

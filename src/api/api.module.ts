import { Module } from '@nestjs/common';
import { ApiV1Module } from './v1/api-v1.module';
import { ApiNeutralModule } from './neutral/api-neutral.module';

@Module({
  imports: [ApiNeutralModule, ApiV1Module],
})
export class ApiModule {}

import { Controller, Get } from '@nestjs/common';
import { ApiVersions } from '../../../common/openapi/api-version';

@Controller({ path: 'health-check', version: ApiVersions.Neutral })
export class HealthCheckController {
  @Get()
  getHealthStatus() {
    return { status: 'OK' };
  }
}

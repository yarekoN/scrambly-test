import { INestApplication, Type } from '@nestjs/common';
import { ApiVersions } from './api-version';
import { ApiNeutralModule } from '../../api/neutral/api-neutral.module';
import { ApiV1Module } from '../../api/v1/api-v1.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const SWAGGER_BASE = '/docs/';
const SPEC_PATH = '/openapi.json';

export function configureDocs(app: INestApplication) {
  setupDocumentsForEachVersion(
    app,
    {
      version: ApiVersions.Neutral,
      module: ApiNeutralModule,
    },
    {
      version: ApiVersions.First,
      module: ApiV1Module,
    },
  );
}

function setupDocumentsForEachVersion(
  app: INestApplication,
  ...apis: { version: ApiVersions; module: Type<any> }[]
) {
  apis.forEach(({ version, module }) => {
    const docsPath = `${SWAGGER_BASE}${version}`;
    const openAPIPath = `${docsPath}${SPEC_PATH}`;

    const serverPathPrefix =
      version === ApiVersions.Neutral ? '' : `/v${version}`;

    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle(`SCRAMBLY-TEST API`)
        .setDescription(
          `<a href="${openAPIPath}">OpenAPI Document (CLICK ME TO GET POSTMAN COLLECTION)</a>`,
        )
        .setVersion('0.0.1')
        .addServer(serverPathPrefix)
        .build(),
      { include: [module], deepScanRoutes: true },
    );

    SwaggerModule.setup(docsPath, app, document, {
      useGlobalPrefix: true,
    });
    app.getHttpAdapter().get(openAPIPath, (_req, res) => res.json(document));
  });
}

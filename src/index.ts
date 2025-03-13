import { App } from './app';
import { router as studentRouter } from './api/student';
import { swaggerSpec } from './swagger';
import { connect } from 'mongoose';
import { mongo as mongoConfig, swagger as swaggerConfig } from './config';
import { koaSwagger } from 'koa2-swagger-ui';

(async () => {
  await connect(mongoConfig.uri);
  const app = App.create({});
  app.use(studentRouter.routes());

  app.use(
    koaSwagger({
      routePrefix: swaggerConfig.routePrefix,
      swaggerOptions: {
        spec: swaggerSpec,
      },
    })
  );
  app.start();
})();

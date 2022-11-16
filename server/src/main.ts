import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  if (process.env.NODE_ENV !== 'local') {
    app.set('trust proxy', 1);
  }

  app.use(cookieParser());
  app.enableCors({
    origin: [process.env.TARGET_ORIGIN],
    credentials: true,
  });

  await app.listen(8000);
}
bootstrap();

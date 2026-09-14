import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

const IMAGE_FOLDER_PATH = process.env.IMAGE_FOLDER_PATH ?? '/content/afisha';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api/afisha', { exclude: [IMAGE_FOLDER_PATH] });
  app.useStaticAssets(
    path.join(__dirname, '..', '/public', IMAGE_FOLDER_PATH),
    {
      prefix: IMAGE_FOLDER_PATH,
    },
  );
  app.enableCors();
  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import debug from 'debug';
import { AppConfig, CONFIG } from './app.config.provider';
export const appDebug = debug('app');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config: AppConfig = app.get(CONFIG);
  const { imageFolder: IMAGE_FOLDER_PATH, port: PORT } = config.settings;

  app.setGlobalPrefix('api/afisha', { exclude: [IMAGE_FOLDER_PATH] });
  app.useStaticAssets(
    path.join(__dirname, '..', '/public', IMAGE_FOLDER_PATH),
    {
      prefix: IMAGE_FOLDER_PATH,
    },
  );
  app.enableCors();
  await app.listen(PORT);
}
bootstrap();

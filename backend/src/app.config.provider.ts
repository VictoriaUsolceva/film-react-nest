import { ConfigModule, ConfigService } from '@nestjs/config';

export const CONFIG = 'CONFIG';

export const configProvider = {
  imports: [ConfigModule.forRoot()],
  provide: CONFIG,
  useFactory: function (configService: ConfigService): AppConfig {
    return {
      database: {
        driver: configService.get<string>(
          'DATABASE_URL',
          'mongodb://localhost:27017/afisha',
        ),
        url: configService.get<string>(
          'DATABASE_URL',
          'mongodb://localhost:27017/afisha',
        ),
      },
      settings: {
        imageFolder: configService.get<string>(
          'IMAGE_FOLDER_PATH',
          '/content/afisha',
        ),
        port: configService.get<number>('PORT', 3000),
      },
    };
  },
  inject: [ConfigService],
};

export interface AppConfig {
  database: AppConfigDatabase;
  settings: AppConfigSettings;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
}

export interface AppConfigSettings {
  imageFolder: string;
  port: number;
}

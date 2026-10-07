import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const CONFIG = 'CONFIG';

export const AppConfigProvider = {
  imports: [ConfigModule.forRoot()],
  provide: CONFIG,
  useFactory: function (configService: ConfigService): AppConfig {
    return {
      database: {
        driver: configService.get<Driver>('DATABASE_DRIVER', 'postgres'),
        url: configService.get<string>(
          'DATABASE_URL',
          'postgres://localhost:5432/films',
        ),
        password: configService.get<string>('DATABASE_PASSWORD', 'student'),
        username: configService.get<string>('DATABASE_USERNAME', 'student'),
        dbname: configService.get<string>('DATABASE_NAME', 'student'),
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

@Module({
  providers: [AppConfigProvider],
  exports: [AppConfigProvider],
})
export class AppConfigModule {}

export interface AppConfig {
  database: AppConfigDatabase;
  settings: AppConfigSettings;
}

type Driver = 'postgres';

export interface AppConfigDatabase {
  driver: Driver;
  url: string;
  username: string;
  password: string;
  dbname: string;
}

export interface AppConfigSettings {
  imageFolder: string;
  port: number;
}

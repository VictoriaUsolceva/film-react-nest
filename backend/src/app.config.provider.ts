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
        dbname: configService.get<string>('DATABASE_NAME', 'films'),
        port: configService.get<number>('DATABASE_PORT', 5432),
        host: configService.get<string>('DATABASE_HOST', 'localhost'),
        password: configService.get<string>('DATABASE_PASSWORD', 'student'),
        username: configService.get<string>('DATABASE_USERNAME', 'student'),
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
  dbname: string;
  port: number;
  host: string;
  username: string;
  password: string;
}

export interface AppConfigSettings {
  imageFolder: string;
  port: number;
}

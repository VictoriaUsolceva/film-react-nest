import { ConfigModule, ConfigService } from '@nestjs/config';

export const CONFIG = 'CONFIG';

const configService = new ConfigService();
const configDatabase: AppConfigDatabase = {
  driver: configService.get<string>('DATABASE_DRIVER', 'mongodb'),
  url: configService.get<string>(
    'DATABASE_URL',
    'mongodb://localhost:27017/afisha',
  ),
};

export const configProvider = {
  imports: [ConfigModule.forRoot()],
  provide: CONFIG,
  useValue: <AppConfig>{ database: configDatabase },
};

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
}

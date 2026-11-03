import { Module } from '@nestjs/common';
import { AppConfig, AppConfigModule, CONFIG } from 'src/app.config.provider';
import { TskvLogger } from './tskv-logger/tskv-logger';
import { DevLogger } from './dev-logger/dev-logger';
import { JsonLogger } from './json-logger/json-logger';

export const APP_LOGGER = 'APP_LOGGER';

@Module({
  providers: [
    {
      provide: APP_LOGGER,
      inject: [CONFIG],
      useFactory: (config: AppConfig) => {
        switch (config.settings.logger) {
          case 'dev':
            return new DevLogger();
          case 'tskv':
            return new TskvLogger();
          case 'json':
            return new JsonLogger();
          default:
            return new DevLogger();
        }
      },
    },
  ],
  imports: [AppConfigModule],
  exports: [APP_LOGGER],
})
export class LoggerModule {}

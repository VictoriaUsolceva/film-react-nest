import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfig, AppConfigModule, CONFIG } from './app.config.provider';
import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: (config: AppConfig) => {
        return {
          type: config.database.driver,
          host: config.database.host,
          port: config.database.port,
          username: config.database.username,
          password: config.database.password,
          database: config.database.dbname,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: false,
        };
      },
      inject: [CONFIG],
    }),
    FilmsModule,
    OrderModule,
    LoggerModule,
  ],
  controllers: [],
})
export class AppModule {}

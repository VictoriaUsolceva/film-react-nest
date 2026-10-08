import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfig, AppConfigModule, CONFIG } from './app.config.provider';
import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: (config: AppConfig) => {
        const { hostname, port, pathname } = new URL(config.database.url);
        return {
          type: config.database.driver,
          host: hostname,
          port: parseInt(port),
          username: config.database.username,
          password: config.database.password,
          database: pathname.substring(1),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: false,
        };
      },
      inject: [CONFIG],
    }),
    FilmsModule,
    OrderModule,
  ],
  controllers: [],
})
export class AppModule {}

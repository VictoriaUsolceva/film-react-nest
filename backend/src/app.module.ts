import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configProvider } from './app.config.provider';
import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    FilmsModule,
    OrderModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [configProvider],
})
export class AppModule {}

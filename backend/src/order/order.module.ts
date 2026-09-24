import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { FilmsMongoDbRepository } from 'src/repository/films.repository';

@Module({
  controllers: [OrderController],
  providers: [OrderService, FilmsMongoDbRepository],
})
export class OrderModule {}

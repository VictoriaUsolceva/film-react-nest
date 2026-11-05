import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import {
  FilmsTypeOrmRepository,
  REPOSITORY_TOKEN,
} from 'src/repository/films.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Films } from 'src/films/entity/film.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Films])],
  controllers: [OrderController],
  providers: [
    OrderService,
    {
      provide: REPOSITORY_TOKEN,
      useClass: FilmsTypeOrmRepository,
    },
  ],
})
export class OrderModule {}

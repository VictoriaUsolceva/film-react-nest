import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';
import { FilmsMongoDbRepository } from 'src/repository/films.repository';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsMongoDbRepository) {}
  async create(order: CreateOrderDto) {
    try {
      const anwser = await this.filmsRepository.createOrder(order);
      return anwser;
    } catch (error) {
      return error;
    }
  }
}

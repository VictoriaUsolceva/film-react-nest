import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
    }
  }
}

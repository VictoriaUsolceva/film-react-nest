import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';
import {
  FilmsRepository,
  REPOSITORY_TOKEN,
} from 'src/repository/films.repository';

@Injectable()
export class OrderService {
  constructor(
    @Inject(REPOSITORY_TOKEN) private readonly filmsRepository: FilmsRepository,
  ) {}
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
      throw error;
    }
  }
}

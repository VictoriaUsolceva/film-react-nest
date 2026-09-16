import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';
import { BadRequestExceptionFilter } from 'src/filters/bad-request-exception.filter';

@UseFilters(BadRequestExceptionFilter)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() orders: CreateOrderDto) {
    return await this.orderService.create(orders);
  }
}

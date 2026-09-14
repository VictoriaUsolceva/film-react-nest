import { Injectable } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  create(orders: OrderDto[]) {
    return 'create ' + orders[0].price;
  }
}

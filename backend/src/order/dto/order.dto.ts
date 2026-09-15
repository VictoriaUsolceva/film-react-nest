class Ticket {
  film: string;
  session: string;
  daytime: string;
  row: number;
  seat: number;
  price: number;
}

export class OrderDto extends Ticket {
  id: string;
}

export class CreateOrderDto {
  email: string;
  phone: string;
  tickets: Ticket[];
}

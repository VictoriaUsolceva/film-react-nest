import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsInt,
  IsString,
  Min,
  ValidateNested,
  IsDateString,
  IsNumber,
} from 'class-validator';

class Ticket {
  @IsString()
  film: string;
  @IsString()
  session: string;
  @IsDateString()
  daytime: string;
  @IsInt()
  @Min(1)
  row: number;
  @IsInt()
  @Min(1)
  seat: number;
  @IsNumber()
  price: number;
}

export class OrderDto extends Ticket {
  @IsString()
  id: string;
}

export class CreateOrderDto {
  @IsEmail()
  email: string;
  @IsString()
  phone: string;
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Ticket)
  tickets: Ticket[];
}

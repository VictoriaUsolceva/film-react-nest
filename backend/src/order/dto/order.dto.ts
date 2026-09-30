import { Type } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsString,
  Min,
  ValidateNested,
  IsDateString,
  IsNumber,
  ArrayNotEmpty,
  IsUUID,
  IsArray,
} from 'class-validator';

class Ticket {
  @IsUUID()
  film: string;
  @IsUUID()
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
  @Min(0)
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
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Ticket)
  tickets: Ticket[];
}

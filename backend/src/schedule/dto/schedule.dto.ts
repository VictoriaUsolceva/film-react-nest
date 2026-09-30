import { IsArray, IsDateString, IsNumber, IsString } from 'class-validator';
export class GetScheduleDTO {
  @IsString()
  id: string;
  @IsDateString()
  daytime: string;
  @IsString()
  hall: string;
  @IsNumber()
  rows: number;
  @IsNumber()
  seats: number;
  @IsNumber()
  price: number;
  @IsArray()
  taken: string[];
}

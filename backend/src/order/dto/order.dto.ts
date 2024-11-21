import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class FilmTicketDto {
  @IsNotEmpty()
  day: string;
  @IsNotEmpty()
  daytime: string;
  @IsNotEmpty()
  film: string;
  @IsNotEmpty()
  price: number;
  @IsNotEmpty()
  row: number;
  @IsNotEmpty()
  seat: number;
  @IsNotEmpty()
  session: number;
  @IsNotEmpty()
  time: number;
}

export class CreateOrderDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FilmTicketDto)
  tickets: FilmTicketDto[];
}

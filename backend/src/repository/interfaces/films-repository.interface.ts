import { Film } from '../../films/entities/film.entity';
import { Schedule } from '../../films/entities/schedule.entity';
import { CreateOrderDto } from '../../order/dto/order.dto';

export interface IFilmsRepository {
  findAll(): Promise<{ total: number; items: Film[] }>;
  findSchedule(id: string): Promise<{ total: number; items: Schedule[] }>;
  createOrder(order: CreateOrderDto): Promise<{ message: string }>;
}

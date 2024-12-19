import { Films } from '../../films/entities/film.entity';
import { Schedules } from '../../films/entities/schedule.entity';
import { CreateOrderDto } from '../../order/dto/order.dto';

export interface IFilmsRepository {
  findAll(): Promise<{ total: number; items: Films[] }>;
  findSchedule(id: string): Promise<{ total: number; items: Schedules[] }>;
  createOrder(order: CreateOrderDto): Promise<{ message: string }>;
}

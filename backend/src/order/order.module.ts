import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { FilmsRepository } from '../repository/films.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedules } from '../films/entities/schedule.entity';
import { Films } from '../films/entities/film.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Films, Schedules])],
  controllers: [OrderController],
  providers: [OrderService, FilmsRepository],
})
export class OrderModule {}

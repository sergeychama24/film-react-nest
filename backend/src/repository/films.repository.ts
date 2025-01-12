import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from '../order/dto/order.dto';
import { Films } from '../films/entities/film.entity';
import { Repository } from 'typeorm';
import { Schedules } from '../films/entities/schedule.entity';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(Films)
    private readonly filmsRepository: Repository<Films>,

    @InjectRepository(Schedules)
    private readonly schedulesRepository: Repository<Schedules>,
  ) {}

  async findAll() {
    const films = await this.filmsRepository.find();
    return {
      total: films.length,
      items: films,
    };
  }

  async findSchedule(id: string) {
    const film = await this.filmsRepository.findOne({
      where: { id },
      relations: ['schedule'],
    });

    if (!film) {
      throw new Error(`Film with ID ${id} not found`);
    }

    return {
      total: film.schedule.length,
      items: film.schedule,
    };
  }

  async createOrder(orderData: CreateOrderDto) {
    for (const ticket of orderData.tickets) {
      const seat = `${ticket.row}:${ticket.seat}`;

      const film = await this.filmsRepository.findOne({
        where: { id: ticket.film },
      });

      if (!film) {
        throw new NotFoundException(`Film with id ${ticket.film} not found`);
      }

      const schedule = await this.schedulesRepository.findOne({
        where: { id: ticket.session.toString() },
      });

      if (!schedule) {
        throw new NotFoundException(
          `Schedule with id ${ticket.session} not found`,
        );
      }

      const arr = schedule.taken.split(',');

      if (arr.includes(seat)) {
        throw new BadRequestException(`Place ${seat} is already taken`);
      }

      arr.push(seat);

      await this.schedulesRepository.update(schedule.id, {
        taken: arr.join(','),
      });
    }

    return {
      message: 'Order was successfully created',
    };
  }
}

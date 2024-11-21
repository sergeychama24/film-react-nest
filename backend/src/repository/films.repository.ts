import { IFilmsRepository } from './interfaces/films-repository.interface';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Film } from '../films/entities/film.entity';
import { Model } from 'mongoose';
import { FilmDocument } from '../films/schemas/film.schema';
import { CreateOrderDto } from '../order/dto/order.dto';

@Injectable()
export class FilmsRepository implements IFilmsRepository {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}

  async findAll() {
    const films = await this.filmModel.find({}, { schedule: 0 }).exec();
    return {
      total: films.length,
      items: films,
    };
  }

  async findSchedule(id: string) {
    const filmSchedule = await this.filmModel
      .findOne({ id })
      .select('schedule')
      .exec();
    if (!filmSchedule) {
      throw new NotFoundException(`Film with ID ${id} not found`);
    }
    return {
      total: filmSchedule.schedule.length,
      items: filmSchedule.schedule,
    };
  }

  async createOrder(orderData: CreateOrderDto) {
    for (const ticket of orderData.tickets) {
      const seat = `${ticket.row}:${ticket.seat}`;

      const film = await this.filmModel.findOne({ id: ticket.film });
      if (!film)
        throw new NotFoundException(`Film with id ${ticket.film} not found`);

      const session = film.schedule.find(
        (session) => session.id === ticket.session.toString(),
      );

      if (!session)
        throw new NotFoundException(
          `Sense with id ${ticket.session} not found`,
        );

      if (session.taken.find((taken) => taken === seat)) {
        throw new BadRequestException(`Place ${seat} is taken`);
      }

      session.taken.push(seat);

      await this.filmModel.updateOne(
        { id: ticket.film, 'schedule.id': ticket.session },
        { $push: { 'schedule.$.taken': seat } },
      );
    }
    return {
      message: 'Order was successful created',
    };
  }
}

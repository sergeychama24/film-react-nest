import { IFilmsRepository } from './interfaces/films-repository.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Film } from '../films/entities/film.entity';
import { Model } from 'mongoose';
import { FilmDocument } from '../films/schemas/film.schema';

@Injectable()
export class FilmsRepository implements IFilmsRepository {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}

  async findAll() {
    const films = await this.filmModel.find().exec();
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
}

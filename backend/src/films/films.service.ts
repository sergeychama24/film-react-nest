import { Injectable, NotFoundException } from '@nestjs/common';
import { Film } from './entities/film.entity';
import { InjectModel } from '@nestjs/mongoose';
import { FilmDocument } from './schemas/film.schema';
import { Model } from 'mongoose';

@Injectable()
export class FilmsService {
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

import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  findAll() {
    return this.filmsRepository.findAll();
  }

  findSchedule(id: string) {
    return this.filmsRepository.findSchedule(id);
  }
}

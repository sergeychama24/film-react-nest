import { Film } from '../entities/film.entity';

export class getFilmsDto {
  total: number;
  items: Film[];
}

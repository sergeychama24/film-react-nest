import { Films } from '../entities/film.entity';

export class getFilmsDto {
  total: number;
  items: Films[];
}

import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('afisha/films')
export class FilmsController {
  constructor(private filmService: FilmsService) {}

  @Get()
  findAll() {
    return this.filmService.findAll();
  }

  @Get(':id/schedule')
  findById(@Param('id') id: string) {
    return this.filmService.findSchedule(id);
  }
}

import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async findAll() {
    return await this.filmsService.findAll();
  }

  @Get(':id/schedule')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.filmsService.findOne(id);
  }
}

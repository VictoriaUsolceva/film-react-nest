import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { FilmsMongoDbRepository } from 'src/repository/films.repository';

@Module({
  controllers: [FilmsController],
  providers: [FilmsService, FilmsMongoDbRepository],
})
export class FilmsModule {}

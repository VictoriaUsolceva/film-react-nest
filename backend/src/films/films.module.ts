import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Films } from './entity/film.entity';
import {
  FilmsTypeOrmRepository,
  REPOSITORY_TOKEN,
} from 'src/repository/films.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Films])],
  controllers: [FilmsController],
  providers: [
    FilmsService,
    {
      provide: REPOSITORY_TOKEN,
      useClass: FilmsTypeOrmRepository,
    },
  ],
  exports: [REPOSITORY_TOKEN],
})
export class FilmsModule {}

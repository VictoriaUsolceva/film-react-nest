import { Injectable } from '@nestjs/common';
import { FilmsMongoDbRepository } from 'src/repository/films.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsMongoDbRepository) {}
  async findAll() {
    return await this.filmsRepository.findAll();
  }

  findOne(id: string) {
    return this.filmsRepository.findOne(id);
  }
}

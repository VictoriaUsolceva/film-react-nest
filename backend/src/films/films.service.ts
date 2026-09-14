import { Injectable } from '@nestjs/common';

@Injectable()
export class FilmsService {
  findAll() {
    return `This action returns all films`;
  }

  findOne(id: string) {
    return `This action returns a #${id} film`;
  }
}

import { Inject, Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { AppConfig, CONFIG } from 'src/app.config.provider';

@Injectable()
export class DatabaseService {
  constructor(@Inject(CONFIG) private readonly config: AppConfig) {}
  async onModuleInit() {
    mongoose.connect(this.config.database.url);
    console.log('Successful connect to mongodb');
  }
}

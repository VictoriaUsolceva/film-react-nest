import { Inject, Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { AppConfig, CONFIG } from 'src/app.config.provider';
import { appDebug } from 'src/main';

@Injectable()
export class DatabaseService {
  constructor(@Inject(CONFIG) private readonly config: AppConfig) {}
  async onModuleInit() {
    mongoose.connect(this.config.database.url);
    appDebug('Successful connect to mongodb');
  }
}

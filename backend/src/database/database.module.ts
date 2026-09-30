import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { configProvider } from 'src/app.config.provider';

@Module({
  providers: [configProvider, DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}

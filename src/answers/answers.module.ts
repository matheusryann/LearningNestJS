import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { DatabaseModule } from 'src/database/database.module';
import { AnswersController } from './answers.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [AnswersController],
  providers: [AnswersService],
})
export class AnswersModule {}

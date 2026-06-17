import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './users/users.module';
import { QuestionsModule } from './questions/questions.module';

@Module({
  imports: [AuthModule, DatabaseModule, UserModule, QuestionsModule]
})
export class AppModule {}

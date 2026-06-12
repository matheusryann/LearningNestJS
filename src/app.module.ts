import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './users/users.module';

@Module({
  imports: [AuthModule, DatabaseModule, UserModule]
})
export class AppModule {}

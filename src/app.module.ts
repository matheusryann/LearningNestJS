import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule, AuthModule, DatabaseModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

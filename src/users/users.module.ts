import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports: [DatabaseModule, forwardRef(() => AuthModule)],  // forwardRef is used to avoid circular dependency
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UserModule {
    
}

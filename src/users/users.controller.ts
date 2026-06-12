import { Body, Controller, Post } from '@nestjs/common';
import { Prisma, UserModel } from 'src/generated/prisma/client';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService)

 @Post('users')
 async signUp(@Body() userData: Prisma.UserCreateInput): Promise<UserModel> {
    return this.usersService.createUser(userData);

 }

}

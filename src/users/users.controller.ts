import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { Prisma, User } from 'src/generated/prisma/client';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

 @Post('signup')
 async signUp(@Body() userData: Prisma.UserCreateInput): Promise<User> {
    return this.usersService.createUser(userData);
 }

 @Get(':id')
 async getUser(@Param('id') id : string): Promise<User | null> {
   return this.usersService.findUser({id: Number(id)});
 }

 @Put() 
 async updatadeUser(@Body() userData: Prisma.UserUpdateInput, @Param('id') id: string): Promise<User> {
   return this.usersService.updateUser({where: {id: Number(id)}, data: userData});
}

@Delete(':id')
async deleteUser(@Param('id') id: string): Promise<User> {
   return this.usersService.deleteUser({id: Number(id)});
}

}
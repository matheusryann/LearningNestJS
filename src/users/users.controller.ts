import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { SafeUser, UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

 @Post('signup')
 async signUp(@Body() userData: Prisma.UserCreateInput): Promise<SafeUser> {
    return this.usersService.createUser(userData);
 }

 @Get(':id')
 async getUser(@Param('id') id : string): Promise<SafeUser> {
   return this.usersService.findUser({id: Number(id)});
 }

 @Put() 
 async updatadeUser(@Body() userData: Prisma.UserUpdateInput, @Param('id') id: string): Promise<SafeUser> {
   return this.usersService.updateUser({where: {id: Number(id)}, data: userData});
}

@Delete(':id')
async deleteUser(@Param('id') id: string): Promise<SafeUser> {
   return this.usersService.deleteUser({id: Number(id)});
}

}
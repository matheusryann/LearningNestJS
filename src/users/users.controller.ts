import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { SafeUser, UsersService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

 @Post('signup')
 async signUp(@Body() userData: CreateUserDto): Promise<SafeUser> {
    return this.usersService.createUser(userData);
 }

 @UseGuards(AuthGuard)
 @Get(':id')
 async getUser(@Param('id') id : string): Promise<SafeUser> {
   return this.usersService.findUser({id: Number(id)});
 }

 @UseGuards(AuthGuard)
 @Patch(':id')
 async updateUser(@Body() userData: Prisma.UserUpdateInput, @Param('id') id: string): Promise<SafeUser> {
   return this.usersService.updateUser({where: {id: Number(id)}, data: userData});
}

@UseGuards(AuthGuard)
@Delete(':id')
async deleteUser(@Param('id') id: string): Promise<SafeUser> {
   return this.usersService.deleteUser({id: Number(id)});
}

}

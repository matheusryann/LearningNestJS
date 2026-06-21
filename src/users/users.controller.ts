import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { SafeUser, UsersService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';
import { AuthenticatedRequest } from 'src/auth/interfaces/authenticated-request.interface';
import { UpdateUserDto } from './dto/update.user.dto';
import { ChangePasswordDto } from 'src/auth/dto/change-password.dto';
import { MessageResponse } from 'src/common/types/message-response.type';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

 @Post('signup')
 async signUp(@Body() userData: CreateUserDto): Promise<SafeUser> {
    return this.usersService.createUser(userData);
 }

 @UseGuards(AuthGuard)
 @Patch('change-password')
 async changePassword(@Body() dto: ChangePasswordDto, @Request() req: AuthenticatedRequest): Promise<MessageResponse> {
   return this.usersService.changePassword(dto, req.user.sub);
 }

 @UseGuards(AuthGuard)
 @Get(':id')
 async getUser(@Param('id', ParseIntPipe) id : number): Promise<SafeUser> {
   return this.usersService.findUser(id);
 }

 @UseGuards(AuthGuard)
 @Patch(':id')
 async updateUser(@Body() userData: UpdateUserDto, @Param('id', ParseIntPipe) id: number, @Request() req: AuthenticatedRequest): Promise<SafeUser> {
   return this.usersService.updateUser({id, data: userData}, req.user.sub);
}

@UseGuards(AuthGuard)
@Delete(':id')
async deleteUser(@Param('id', ParseIntPipe) id: number, @Request() req: AuthenticatedRequest): Promise<SafeUser> {
   return this.usersService.deleteUser(id, req.user.sub);
}

}

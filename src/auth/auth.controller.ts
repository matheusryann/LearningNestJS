import { Controller, Post, Body } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma/client';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('sign-in') 
    async signIn(@Body() body: Prisma.UserCreateInput) {
        return this.authService.signIn(body);
    }
}

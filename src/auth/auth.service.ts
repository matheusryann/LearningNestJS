import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Prisma, User } from 'src/generated/prisma/client';
import { UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
    constructor(private readonly UserService: UsersService) {}

    async signIn(params: Prisma.UserCreateInput): Promise<Omit<User, 'password'>> {
        const user = await this.UserService.findUser({ email: params.email });
        if (!user) {
            throw new NotFoundException('User not found');
    }

    const passwordMatches = await argon2.verify(user.password, params.password);
    if (!passwordMatches) {
        throw new UnauthorizedException('Invalid credentials');
    }

    const { password, ...result } = user;
    return result;
}

}

import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Prisma } from '@prisma/client';
import { UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly UserService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async signIn(params: Prisma.UserCreateInput): Promise<{access_token: string}> {
        const user = await this.UserService.findUserWithPassword({ email: params.email });
        if (!user) {
            throw new NotFoundException('User not found');
    }

    const passwordMatches = await argon2.verify(user.password, params.password);
    if (!passwordMatches) {
        throw new UnauthorizedException('Invalid credentials');
    }

     const payload = { sub: user.id };

      return {
      access_token: await this.jwtService.signAsync(payload)
    };

}

}

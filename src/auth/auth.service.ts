import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly UserService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async signIn(params: SignInDto): Promise<{access_token: string}> {
        const user = await this.UserService.findUserWithPassword({ email: params.email });
        if (!user) {
            throw new NotFoundException('Email or password is incorrect');
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

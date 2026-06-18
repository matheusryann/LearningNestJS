import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as argon2 from 'argon2';

export type SafeUser = Omit<User, 'password'>;

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService){}  // Outra forma de injetar o PrismaService é usando o decorator @Inject(), Ex: @Inject(PrismaService) private readonly prisma: PrismaService

    async findUserWithPassword(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
        return this.prisma.user.findUnique({ where });
    }

    async findUser(where: Prisma.UserWhereUniqueInput): Promise<SafeUser> {
        const user = await this.findUserWithPassword(where);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return this.toSafeUser(user);
    }

    async createUser(data: Prisma.UserCreateInput): Promise<SafeUser> {
        const hashPassword = await argon2.hash(data.password, {
            type: argon2.argon2id,
            memoryCost: 19456,
            timeCost: 2,
            parallelism: 1
        });
        const user = await this.prisma.user.create({data: {
            ...data,
            password: hashPassword
        }});
        return this.toSafeUser(user);
    }

    async updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<SafeUser> {
        const { where, data } = params;
        const user = await this.prisma.user.update({ where, data });
        return this.toSafeUser(user);
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<SafeUser> {
        const user = await this.prisma.user.delete({ where });
        return this.toSafeUser(user);
    }

    private toSafeUser(user: User): SafeUser {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}

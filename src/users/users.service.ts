import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Inject } from '@nestjs/common';
import { Prisma, User } from 'src/generated/prisma/client';


@Injectable()
export class UsersService {
    @Inject()
    private readonly prisma: PrismaService;  // Outra forma de injetar o PrismaService é usando o constructor Ex: constructor(private readonly prisma: PrismaService) {}

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({ data });
    }

    async updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<User> {
        const { where, data } = params;
        return this.prisma.user.update({ where, data });
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prisma.user.delete({ where });
    }
    

}

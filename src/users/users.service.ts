import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma, User } from 'src/generated/prisma/client';


@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService){}  // Outra forma de injetar o PrismaService é usando o decorator @Inject(), Ex: @Inject(PrismaService) private readonly prisma: PrismaService


    async findUser(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
        return this.prisma.user.findUnique({ where });
    }

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({data});
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

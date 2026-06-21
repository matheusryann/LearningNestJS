import { ConflictException, Injectable, NotFoundException, ForbiddenException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as argon2 from 'argon2';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { ChangePasswordDto } from 'src/auth/dto/change-password.dto';
import { MessageResponse } from 'src/common/types/message-response.type';
import { hashPassword } from 'src/common/utils/password.util';  // Função para hashear a senha

export type SafeUser = Omit<User, 'password'>;

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }  // Outra forma de injetar o PrismaService é usando o decorator @Inject(), Ex: @Inject(PrismaService) private readonly prisma: PrismaService

    async findUserWithPasswordByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: {email} });
    }

    async findUser(id: number): Promise<SafeUser> {
        const user = await this.prisma.user.findUnique({ where: {id} });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return this.toSafeUser(user);
    }

    async createUser(data: CreateUserDto): Promise<SafeUser> {
        try {
            const hashedPassword = await hashPassword(data.password);
            const user = await this.prisma.user.create({ data: { ...data, password: hashedPassword } });
            return this.toSafeUser(user);
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002'
            ) {
                throw new ConflictException('Email already registered');
            }
            throw error;
        }
    }

    async updateUser(params: {
        id: number;
        data: UpdateUserDto;
    }, userId: number): Promise<SafeUser> {
        if (params.id !== userId) {
            throw new ForbiddenException('You are not allowed to update this user');
        }
        try {
        const { id, data } = params;
        const user = await this.prisma.user.update({ where: {id}, data });
        return this.toSafeUser(user);
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025'
            ) {
                throw new NotFoundException('User not found');
            } else if (
                error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002'
            ) {
                throw new ConflictException('Email already registered');
            }
            throw error;
        }
    }

    async deleteUser(id: number, userId: number): Promise<SafeUser> {
        if (id !== userId) {
            throw new ForbiddenException('You are not allowed to delete this user');
        }
        try { 
            const user = await this.prisma.user.delete({ where: {id} });
            return this.toSafeUser(user);
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025'
            ) {
                throw new NotFoundException('User not found');
            }
            throw error;
        }
    }

    async changePassword(dto: ChangePasswordDto, userId: number): Promise<MessageResponse> {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const isPasswordValid = await argon2.verify(user.password, dto.currentPassword);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid current password');
        }

        if (dto.newPassword === dto.currentPassword) {
            throw new BadRequestException('New password cannot be the same as the current password');
        }

        const hashedNewPassword = await hashPassword(dto.newPassword);

        try {
            await this.prisma.user.update({
                where: { id: userId },
                data: { password: hashedNewPassword },
            });
            return { message: 'Password changed successfully' };
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025'
            ) {
                throw new NotFoundException('User not found');
            }
            throw error;
        }
    }

    private toSafeUser(user: User): SafeUser {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}

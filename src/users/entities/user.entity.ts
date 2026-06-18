import { User as PrismaUser } from '@prisma/client';

export class User implements PrismaUser {
    createdAt: Date;
    updatedAt: Date;
    id: number;
    email: string;
    name: string;
    password: string;

}
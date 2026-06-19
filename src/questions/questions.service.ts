import {Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class QuestionsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createQuestionDto: CreateQuestionDto, userId: number) {
    try {
    return await this.prisma.questions.create({
      data: {
        ...createQuestionDto,
        userId,
      },
    }); } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003'
      ) {
        throw new NotFoundException('User not found');
      }
      throw error;
    }
  }

  async findAll() {
    return await this.prisma.questions.findMany();
  }

  async findOne(id: number) {
    const question = await this.prisma.questions.findUnique({
      where: {id},
    });
    if (!question) {
      throw new NotFoundException('Question not found');
    }
    return question;
  }

 async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    try {
    return await this.prisma.questions.update({
      where:{id},
      data: updateQuestionDto,
    }) } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025'
      ) {
        throw new NotFoundException('Question not found');
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
    return await this.prisma.questions.delete({
      where:{id},
    }) } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025'
      ) {
        throw new NotFoundException('Question not found');
      }
      throw error;
    }
  }
}

import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AnswersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createAnswerDto: CreateAnswerDto, userId: number, questionId: number) {
    try {
    return await this.prisma.answers.create({
      data: {
      body: createAnswerDto.body,
      user: {
        connect: {
          id: userId,
        },
      },
      question: {
        connect: {
          id: questionId,
        },
      }
    }});  
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003'
    ) {
      throw new NotFoundException('User or question not found');
    }
    throw error;
  }
  }

  async findAll() {
    return await this.prisma.answers.findMany();
  }

  async findOne(id: number) {
    const answer = await this.prisma.answers.findUnique({
      where: {id},
    });
    if (!answer) {
      throw new NotFoundException('Answer not found');
    }
    return answer;

  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto, userId: number) {
    const answer = await this.prisma.answers.findUnique({
      where: {id},
    });
    if (!answer) {
      throw new NotFoundException('Answer not found');
    }
    if (answer.userId !== userId) {
      throw new ForbiddenException('You are not allowed to update this answer');
    }
    try {
    return await this.prisma.answers.update({
      where: {id},
      data: updateAnswerDto,
    }); }
    catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
          throw new NotFoundException('Answer not found');
        }
      throw error;
    }
  }

  async remove(id: number, userId: number) {
    const answer = await this.prisma.answers.findUnique({
      where: {id},
    });
    if (!answer) {
      throw new NotFoundException('Answer not found');
    }
    if (answer.userId !== userId) {
      throw new ForbiddenException('You are not allowed to delete this answer');
    }
    try {
      return await this.prisma.answers.delete({
        where: {id},
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
          throw new NotFoundException('Answer not found');
        }
        throw error;
      }
    }
  }
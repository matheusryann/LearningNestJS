import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AnswersService {
  constructor(private readonly prisma: PrismaService) {}
  create(createAnswerDto: CreateAnswerDto, userId: number, questionId: number) {
    try {
    const newAnswer = {
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
    }
    return this.prisma.answers.create({
      data: newAnswer,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003'
    ) {
      throw new NotFoundException('User or question not found');
    }
    throw error;
  }
  }

  findAll() {
    return this.prisma.answers.findMany();
  }

  findOne(id: number) {
    try {
    return this.prisma.answers.findUnique({
      where: {id},
    });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025'
      ) {
        throw new NotFoundException('Answer not found');
      }
      throw error;
    }
  }

  update(id: number, updateAnswerDto: UpdateAnswerDto) {
    try {
    return this.prisma.answers.update({
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

  remove(id: number) {
    try {
      return this.prisma.answers.delete({
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
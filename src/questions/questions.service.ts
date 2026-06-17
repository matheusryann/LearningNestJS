import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class QuestionsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createQuestionDto: CreateQuestionDto) {
    const userId = 1;
    return await this.prisma.questions.create({
      data: {
        ...createQuestionDto,
        userId: userId,
    
      },
    });
  }

  async findAll() {
    return await this.prisma.questions.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.questions.findUnique({
      where: {id},
    });
  }

 async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return await this.prisma.questions.update({
      where:{id},
      data: updateQuestionDto,
    })
  }

  async remove(id: number) {
    return await this.prisma.questions.delete({
      where:{id},
    })
  }
}

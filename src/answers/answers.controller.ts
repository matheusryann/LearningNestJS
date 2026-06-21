import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ParseIntPipe} from '@nestjs/common';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthenticatedRequest } from 'src/auth/interfaces/authenticated-request.interface';


@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @UseGuards(AuthGuard)
  @Post(':questionId')
  create(@Body() createAnswerDto: CreateAnswerDto, @Request() req: AuthenticatedRequest, @Param('questionId') questionId: string) {
    return this.answersService.create(createAnswerDto, req.user.sub, Number(questionId));
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.answersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.answersService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAnswerDto: UpdateAnswerDto, @Request() req: AuthenticatedRequest) {
    return this.answersService.update(+id, updateAnswerDto, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req: AuthenticatedRequest) {
    return this.answersService.remove(+id, req.user.sub);
  }
}

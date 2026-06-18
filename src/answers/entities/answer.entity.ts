import { Answers} from '@prisma/client';
import { User } from 'src/users/entities/user.entity'
import { Question } from 'src/questions/entities/question.entity';

export class Answer implements Answers {
  id: number;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  questionId: number;
  user: User;
  question: Question;
}

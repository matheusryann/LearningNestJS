import { IsString, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateQuestionDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    title: string

    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(200)
    body: string
}

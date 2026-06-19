import{ IsString, IsNotEmpty, MaxLength } from 'class-validator'

export class CreateAnswerDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    body: string;
}

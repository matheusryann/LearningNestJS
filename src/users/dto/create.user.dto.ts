import { IsString, IsNotEmpty, IsEmail, Matches} from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail({}, {
        message: "Email must be a valid address"
    })
    email: string;

    @IsString()
    @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/, {
        message: "Password must be at least 8 characters long and contain at least one uppercase letter, one number and one special character"
    })
    password: string;
}
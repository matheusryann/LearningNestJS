import {
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'ConfirmPasswordMatch', async: false }) 
class ConfirmPasswordMatchConstraint implements ValidatorConstraintInterface {
  validate(confirmNewPassword: string, args: ValidationArguments): boolean {
    const dto = args.object as ChangePasswordDto;
    return confirmNewPassword === dto.newPassword;
  }

  defaultMessage(): string {
    return 'Passwords do not match';
  }
}

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  currentPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/, {
    message:
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character',
  })
  newPassword: string;

  @IsString()
  @IsNotEmpty()
  @Validate(ConfirmPasswordMatchConstraint)
  confirmNewPassword: string;
}

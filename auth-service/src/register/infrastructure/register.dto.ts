/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { IsEmail, IsNotEmpty, MinLength, ValidateIf } from 'class-validator';

export class RegisterDTO {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at leat 6 characters long' })
  password: string;

  @IsNotEmpty({ message: 'Confirm password is required' })
  @ValidateIf((obj) => obj.password !== obj.confirmPassword, {
    message: 'Passwords do not match',
  })
  confirmPassword: string;
}

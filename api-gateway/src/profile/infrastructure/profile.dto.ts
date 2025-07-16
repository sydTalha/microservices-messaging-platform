import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class ProfileDTO {
  @IsString()
  @IsNotEmpty()
  displayName: string;

  @IsEnum(['male', 'female'])
  gender: 'male' | 'femail';

  @IsDateString()
  birthday: string;

  @IsString()
  height: string;

  @IsString()
  weight: string;
}

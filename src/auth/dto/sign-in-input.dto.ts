import { IsAscii, IsEmail, IsString, Min } from 'class-validator';

export class SignInInputDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  password: string;
}

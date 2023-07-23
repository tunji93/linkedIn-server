import { IsAscii, IsEmail, IsString, Min } from 'class-validator';

export class SignInInputDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsAscii()
  @Min(8)
  password: string;
}

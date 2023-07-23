import {
  IsAscii,
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class SignUpInputDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;

  @IsString()
  firstname: string;

  @IsString()
  lastname: string;
}

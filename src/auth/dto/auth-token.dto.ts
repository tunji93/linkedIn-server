import { IsNotEmpty, IsString } from 'class-validator';

export class AuthTokenDto {
  @IsNotEmpty()
  @IsString()
  access_token: string;

  @IsNotEmpty()
  @IsString()
  refresh_token: string;
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpInputDto } from './dto/sign-up-input.dto';
import { SignInInputDto } from './dto/sign-in-input.dto';
import { User } from 'src/user/entities/user.entity';
import { SignInResponseDto } from './dto/sign-in-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UseInterceptors(ClassSerializerInterceptor)
  signUp(@Body() signUpInputDto: SignUpInputDto): Promise<User> {
    return this.authService.signUp(signUpInputDto);
  }
  @Post('signin')
  @UseInterceptors(ClassSerializerInterceptor)
  signIn(@Body() signInInputDto: SignInInputDto): Promise<SignInResponseDto> {
    return this.authService.signIn(signInInputDto);
  }
}

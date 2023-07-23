import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpInputDto } from './dto/sign-up-input.dto';
import { SignInInputDto } from './dto/sign-in-input.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() signUpInputDto: SignUpInputDto) {
    return this.authService.signUp(signUpInputDto);
  }

  @Post('signin')
  signIn(@Body() signInInputDto: SignInInputDto) {
    return this.authService.signIn(signInInputDto);
  }
}

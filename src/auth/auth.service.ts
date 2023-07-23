import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { SignInInputDto } from './dto/sign-in-input.dto';
import { SignUpInputDto } from './dto/sign-up-input.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  signUp(signUpInputDto: SignUpInputDto): Promise<User> {
    console.log(signUpInputDto);
    try {
      const u = new User();
      Object.assign(u, { ...signUpInputDto });
      u.email = u.email.toLowerCase();
      u.password = AuthService.encryptPassword(u.password);
      const user = this.userRepository.save(u);
      return user;
    } catch (error) {
      let errorMessage = error.message;
      if (Array.isArray(errorMessage)) {
        errorMessage = errorMessage[0];
      }
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }
  }

  private static encryptPassword(password): string {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
  }

  signIn(signIpInputDto: SignInInputDto) {
    return 'This action adds a new auth';
  }
}

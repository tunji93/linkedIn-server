import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { SignInInputDto } from './dto/sign-in-input.dto';
import { SignUpInputDto } from './dto/sign-up-input.dto';
import { JwtPayload } from 'src/utils/interfaces/jwt-payload';
import { UserService } from 'src/user/user.service';
import { SignInResponseDto } from './dto/sign-in-response.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
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

  async signIn(signInInputDto: SignInInputDto): Promise<SignInResponseDto> {
    console.log(signInInputDto);
    const email = signInInputDto.email.toLowerCase();
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new HttpException('Invalid Credentials', HttpStatus.BAD_REQUEST);
    }
    console.log(user);
    const valid = await bcrypt.compare(signInInputDto.password, user.password);
    if (!valid) {
      throw new HttpException('Invalid Credentials', HttpStatus.BAD_REQUEST);
    }

    const payload: JwtPayload = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    };
    const access_token = this.jwtService.sign(payload);
    const refresh_token = this.issueRefreshToken(payload);
    return { ...user, access_token, refresh_token };
  }

  async validateUser(payload?: JwtPayload): Promise<User> {
    const user = await this.userService.findUserByEmail(payload.email);
    return user;
  }

  private issueRefreshToken(payload: JwtPayload): string {
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.config.env.JWT_SECRET,
      expiresIn: 2592000 * 6, // ~6 months
    });

    return refreshToken;
  }
}

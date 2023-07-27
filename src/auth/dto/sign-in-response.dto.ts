import { User } from 'src/user/entities/user.entity';

export class SignInResponseDto extends User {
  readonly access_token: string;
  readonly refresh_token: string;
}

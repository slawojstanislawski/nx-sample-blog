import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';

import {
  IJwtTokenPayload,
  IUser,
  LoginResponse
} from '@blog/shared/auth/data-access';
import {UsersApiService} from '../users/services/users-api.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersApiService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(
    username: string,
    pass: string
  ): Promise<Omit<IUser, 'password'> | false> {
    const user = await this.usersService.findOne(username);
    if (user) {
      const isPasswordValid = await this.usersService.validatePassword(
        pass,
        user.password
      );
      if (isPasswordValid) {
        const {password, ...result} = user;
        return result;
      }
    }

    return false;
  }

  async login(user: any): Promise<LoginResponse> {
    const payload: IJwtTokenPayload = {
      username: user.username,
      sub: user.userId
    };
    return {
      jwt_token: this.jwtService.sign(payload)
    };
  }
}

import {Strategy as PassportStrategyLocal} from 'passport-local';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';

import {IUser} from '@blog/shared/auth/data-access';
import {AuthService} from '../auth.service';

@Injectable()
export class AuthStrategyLocal extends PassportStrategy(PassportStrategyLocal) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(
    username: string,
    password: string
  ): Promise<Omit<IUser, 'password'>> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

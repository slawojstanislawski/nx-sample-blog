import {ExtractJwt, Strategy as PassportStrategyJwt} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';

import {
  IAuthenticatedUserData,
  IJwtTokenPayload
} from '@blog/shared/auth/data-access';
import {ConfigService} from '../../config/config.service';

@Injectable()
export class AuthStrategyJwt extends PassportStrategy(PassportStrategyJwt) {
  constructor(configService: ConfigService) {
    const jwtSecret = configService.get('JWT_SECRET');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret
    });
  }

  async validate(payload: IJwtTokenPayload): Promise<IAuthenticatedUserData> {
    // if we get here, we're guaranteed that it's a valid token we issued previously.
    // for now the data is enough, in the future, we can lookup the user and return more data,
    // which will be next'ed as Request.user.
    const {sub, username} = payload;
    return {
      id: sub,
      username
    };
  }
}

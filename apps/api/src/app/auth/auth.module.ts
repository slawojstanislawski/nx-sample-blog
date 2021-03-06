import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {Module} from '@nestjs/common';

import {ConfigService, SharedConfigModule} from '@blog/shared/config';
import {AuthStrategyLocal} from './strategies/strategy.local';
import {AuthStrategyJwt} from './strategies/strategy.jwt';
import {StrategyTypes} from './strategies/strategy-types';
import {UsersModule} from '../users/users.module';
import {AuthService} from './auth.service';

@Module({
  imports: [
    SharedConfigModule,
    UsersModule,
    PassportModule.register({defaultStrategy: StrategyTypes.JWT}),
    JwtModule.registerAsync({
      imports: [SharedConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {expiresIn: configService.get('JWT_TIMEOUT')}
        };
      },
      inject: [ConfigService]
    })
  ],
  providers: [AuthService, AuthStrategyLocal, AuthStrategyJwt],
  exports: [AuthService]
})
export class AuthModule {}

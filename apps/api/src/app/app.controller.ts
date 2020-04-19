import {Controller, Request, Post, UseGuards} from '@nestjs/common';
import {StrategyTypes} from './auth/strategies/strategy-types';
import {LoginResponse} from '@blog/shared/auth/data-access';
import {AuthService} from './auth/auth.service';
import {AuthGuard} from '@nestjs/passport';

@Controller('')
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard(StrategyTypes.LOCAL))
  @Post('login')
  async login(@Request() req): Promise<LoginResponse> {
    return this.authService.login(req.user);
  }
}

import {Body, Controller, Post} from '@nestjs/common';

import {UsersApiService} from '../services/users-api.service';
import {IUserDocument} from '@blog/shared/users/data-access';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersApiService) {}

  @Post()
  async createOne(@Body() createUserDto: any): Promise<IUserDocument> {
    return await this.userService.create(createUserDto);
  }
}

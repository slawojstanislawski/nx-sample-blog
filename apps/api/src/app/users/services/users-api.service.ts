import {InjectModel} from '@nestjs/mongoose';
import {Injectable} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import {Model} from 'mongoose';

import {IUserDocument} from '@blog/shared/users/data-access';

@Injectable()
export class UsersApiService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<IUserDocument>
  ) {}

  async validatePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async findOne(username: string): Promise<IUserDocument | null> {
    return await this.userModel.findOne({username}).exec();
  }
}

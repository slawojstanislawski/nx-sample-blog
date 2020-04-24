import {InjectModel} from '@nestjs/mongoose';
import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';

import {IUser, IUserDocument} from '@blog/shared/users/data-access';

@Injectable()
export class UserSeederService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<IUserDocument>
  ) {}

  users: IUser[] = [
    {username: 'john', password: 'snow'},
    {username: 'cersei', password: 'lannister'}
  ];

  create(): Array<Promise<IUserDocument | null>> {
    return this.users.map(async (user: IUser) => {
      const {username} = user;
      return await this.userModel
        .findOne({username: username.toLocaleLowerCase()})
        .exec()
        .then(async foundUser => {
          if (foundUser) {
            return Promise.resolve(null);
          }
          return Promise.resolve(await this.userModel.create(user));
        })
        .catch(error => Promise.reject(error));
    });
  }
}

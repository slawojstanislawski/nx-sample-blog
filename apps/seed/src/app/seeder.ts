import {Injectable, Logger} from '@nestjs/common';

import {UserSeederService} from './users-seeder/services/user.seeder.service';
import {IUserDocument} from '@blog/shared/users/data-access';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly usersSeederService: UserSeederService
  ) {}

  async seed() {
    await this.users()
      .then(completed => {
        this.logger.debug('Successfully completed seeding users...');
        Promise.resolve(completed);
      })
      .catch(error => {
        this.logger.error('Failed seeding users...');
        Promise.reject(error);
      });
  }

  async users() {
    return await Promise.all(this.usersSeederService.create())
      .then((createdUsers: Array<IUserDocument | null>) => {
        this.logger.debug(
          'No. of users created : ' + createdUsers.filter(user => !!user).length
        );
        return Promise.resolve(true);
      })
      .catch(error => {
        this.logger.error(error);
        return Promise.reject(error);
      });
  }
}

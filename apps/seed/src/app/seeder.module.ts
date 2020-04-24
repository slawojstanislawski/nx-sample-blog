import {Logger, Module} from '@nestjs/common';

import {UsersSeederModule} from './users-seeder/users.seeder.module';
import {Seeder} from './seeder';

@Module({
  imports: [UsersSeederModule],
  providers: [Logger, Seeder]
})
export class SeederModule {}

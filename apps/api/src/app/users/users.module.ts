import {MongooseModule} from '@nestjs/mongoose';
import {Module} from '@nestjs/common';

import {UsersApiService} from './services/users-api.service';
import {ConfigModule} from '../config/config.module';
import {UserSchema} from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
    ConfigModule
  ],
  providers: [UsersApiService],
  exports: [UsersApiService]
})
export class UsersModule {}

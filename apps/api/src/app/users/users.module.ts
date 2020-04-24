import {MongooseModule} from '@nestjs/mongoose';
import {Module} from '@nestjs/common';

import {ConfigService, SharedConfigModule} from '@blog/shared/config';
import {userSchemaFactory} from '@blog/shared/users/data-access';
import {UserController} from './controllers/user.controller';
import {UsersApiService} from './services/users-api.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'User',
        imports: [SharedConfigModule],
        useFactory: (configService: ConfigService) => {
          return userSchemaFactory(configService);
        },
        inject: [ConfigService]
      }
    ])
  ],
  providers: [UsersApiService],
  controllers: [UserController],
  exports: [UsersApiService]
})
export class UsersModule {}

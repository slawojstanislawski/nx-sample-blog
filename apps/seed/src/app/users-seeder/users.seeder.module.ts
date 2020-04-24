import {MongooseModule} from '@nestjs/mongoose';
import {Module} from '@nestjs/common';

import {ConfigService, SharedConfigModule} from '@blog/shared/config';
import {userSchemaFactory} from '@blog/shared/users/data-access';
import {UserSeederService} from './services/user.seeder.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [SharedConfigModule],
      useFactory: (configService: ConfigService) => {
        const uri = configService.dbUri;
        return {uri};
      },
      inject: [ConfigService]
    }),
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
  providers: [UserSeederService],
  exports: [UserSeederService]
})
export class UsersSeederModule {}

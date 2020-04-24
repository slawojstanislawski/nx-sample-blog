import {MongooseModule} from '@nestjs/mongoose';
import {Module} from '@nestjs/common';

import {ConfigService, SharedConfigModule} from '@blog/shared/config';
import {UsersModule} from './users/users.module';
import {PostsModule} from './posts/posts.module';
import {AppController} from './app.controller';
import {AuthModule} from './auth/auth.module';

@Module({
  imports: [
    SharedConfigModule,
    MongooseModule.forRootAsync({
      imports: [SharedConfigModule],
      useFactory: (configService: ConfigService) => {
        const uri = configService.dbUri;
        return {uri};
      },
      inject: [ConfigService]
    }),
    PostsModule,
    AuthModule,
    UsersModule
  ],
  controllers: [AppController]
})
export class AppModule {}

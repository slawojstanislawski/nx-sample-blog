import {MongooseModule} from '@nestjs/mongoose';
import {Module} from '@nestjs/common';

import {ConfigService} from './config/config.service';
import {ConfigModule} from './config/config.module';
import {UsersModule} from './users/users.module';
import {PostsModule} from './posts/posts.module';
import {AppController} from './app.controller';
import {AuthModule} from './auth/auth.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
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

import {MongooseModule} from '@nestjs/mongoose';
import {Module} from '@nestjs/common';

import {PostController} from './controllers/post.controller';
import {PostsApiService} from './services/posts-api.service';
import {PostSchema} from './schemas/post.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Post', schema: PostSchema}])],
  controllers: [PostController],
  providers: [PostsApiService]
})
export class PostsModule {}

import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';

import {
  CreatePostDto,
  UpdatePostDto,
  IPostDocument
} from '@blog/shared/posts/data-access';
import {StrategyTypes} from '../../auth/strategies/strategy-types';
import {PostsApiService} from '../services/posts-api.service';

@UseGuards(AuthGuard(StrategyTypes.JWT))
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostsApiService) {}

  @Get()
  async findAll(): Promise<IPostDocument[]> {
    return await this.postService.findAllPosts();
  }

  @Post()
  async createOne(
    @Body() createPostDto: CreatePostDto
  ): Promise<IPostDocument> {
    return await this.postService.createPost(createPostDto);
  }

  @Get(':id')
  async getOneById(@Param('id') id: string): Promise<IPostDocument | null> {
    return await this.postService.findPostById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto
  ): Promise<IPostDocument | null> {
    return await this.postService.updatePost(id, updatePostDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<object> {
    const result = await this.postService.removePost(id);
    if (result) {
      return {ok: 1};
    } else {
      throw new BadRequestException();
    }
  }
}

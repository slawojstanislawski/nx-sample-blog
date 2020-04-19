import {InjectModel} from '@nestjs/mongoose';
import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';

import {
  CreatePostDto,
  IPostDocument,
  UpdatePostDto
} from '@blog/shared/posts/data-access';

@Injectable()
export class PostsApiService {
  constructor(
    @InjectModel('Post') private readonly postModel: Model<IPostDocument>
  ) {}

  async findAllPosts(): Promise<IPostDocument[]> {
    return await this.postModel
      .find()
      .sort('-createdAt')
      .exec();
  }

  async findPostById(id: string): Promise<IPostDocument | null> {
    return await this.postModel.findOne({_id: id}).exec();
  }

  async createPost(createPostDto: CreatePostDto): Promise<IPostDocument> {
    const createdPost = new this.postModel(createPostDto);
    return await createdPost.save();
  }

  async updatePost(
    postId: string,
    updatePostDto: UpdatePostDto
  ): Promise<IPostDocument | null> {
    return await this.postModel
      .findByIdAndUpdate(postId, updatePostDto, {new: true})
      .exec();
  }

  async removePost(postId: string): Promise<IPostDocument | null> {
    return await this.postModel.findByIdAndDelete(postId).exec();
  }
}

import {Test, TestingModule} from '@nestjs/testing';

import {PostController} from './post.controller';
import {PostsApiService} from '../services/posts-api.service';

describe('PostController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [PostController],
      providers: [PostsApiService]
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      const appController = app.get<PostController>(PostController);
      expect(appController.findAll()).toEqual({message: 'Welcome to api!'});
    });
  });
});

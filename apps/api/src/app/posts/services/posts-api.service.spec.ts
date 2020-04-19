import {Test} from '@nestjs/testing';

import {PostsApiService} from './posts-api.service';

describe('PostsApiService', () => {
  let service: PostsApiService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [PostsApiService]
    }).compile();

    service = app.get<PostsApiService>(PostsApiService);
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      expect(service.findAllPosts()).toEqual({message: 'Welcome to api!'});
    });
  });
});

import {async, TestBed} from '@angular/core/testing';
import {BlogFeaturePostsModule} from './blog-feature-posts.module';

describe('BlogFeaturePostsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BlogFeaturePostsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(BlogFeaturePostsModule).toBeDefined();
  });
});

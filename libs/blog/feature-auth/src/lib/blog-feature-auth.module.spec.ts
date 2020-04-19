import {async, TestBed} from '@angular/core/testing';
import {BlogFeatureAuthModule} from './blog-feature-auth.module';

describe('BlogFeatureAuthModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BlogFeatureAuthModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(BlogFeatureAuthModule).toBeDefined();
  });
});

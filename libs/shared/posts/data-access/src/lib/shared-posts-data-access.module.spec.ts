import {async, TestBed} from '@angular/core/testing';
import {SharedPostsDataAccessModule} from './shared-posts-data-access.module';

describe('SharedPostsDataAccessModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedPostsDataAccessModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedPostsDataAccessModule).toBeDefined();
  });
});

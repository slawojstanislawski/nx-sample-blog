import {async, TestBed} from '@angular/core/testing';

import {SharedPostsUiModule} from './shared-posts-ui.module';

describe('SharedPostsUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedPostsUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedPostsUiModule).toBeDefined();
  });
});

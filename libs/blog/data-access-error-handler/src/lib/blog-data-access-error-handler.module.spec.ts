import {async, TestBed} from '@angular/core/testing';
import {BlogDataAccessErrorHandlerModule} from './blog-data-access-error-handler.module';

describe('BlogDataAccessErrorHandlerModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BlogDataAccessErrorHandlerModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(BlogDataAccessErrorHandlerModule).toBeDefined();
  });
});

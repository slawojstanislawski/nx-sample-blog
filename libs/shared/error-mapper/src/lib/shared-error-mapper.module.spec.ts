import {async, TestBed} from '@angular/core/testing';
import {SharedErrorMapperModule} from './shared-error-mapper.module';

describe('SharedErrorMapperModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedErrorMapperModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedErrorMapperModule).toBeDefined();
  });
});

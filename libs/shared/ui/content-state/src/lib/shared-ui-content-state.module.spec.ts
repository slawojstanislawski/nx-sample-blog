import {async, TestBed} from '@angular/core/testing';
import {SharedUiContentStateModule} from './shared-ui-content-state.module';

describe('SharedUiContentStateModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedUiContentStateModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedUiContentStateModule).toBeDefined();
  });
});

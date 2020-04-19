import {async, TestBed} from '@angular/core/testing';
import {SharedUiTitleRowModule} from './shared-ui-title-row.module';

describe('SharedUiTitleRowModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedUiTitleRowModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedUiTitleRowModule).toBeDefined();
  });
});

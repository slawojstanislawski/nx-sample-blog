import {async, TestBed} from '@angular/core/testing';
import {SharedSnackbarModule} from './shared-snackbar.module';

describe('SharedSnackbarModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedSnackbarModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedSnackbarModule).toBeDefined();
  });
});

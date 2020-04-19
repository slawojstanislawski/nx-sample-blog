import {async, TestBed} from '@angular/core/testing';
import {SharedAuthDataAccessModule} from './shared-auth-data-access.module';

describe('SharedAuthDataAccessModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedAuthDataAccessModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedAuthDataAccessModule).toBeDefined();
  });
});

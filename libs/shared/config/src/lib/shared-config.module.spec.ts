import {async, TestBed} from '@angular/core/testing';

import {SharedConfigModule} from './shared-config.module';

describe('SharedConfigModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedConfigModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedConfigModule).toBeDefined();
  });
});

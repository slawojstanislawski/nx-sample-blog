import {async, TestBed} from '@angular/core/testing';

import {SharedUtilNgSubscribeModule} from './shared-util-ng-subscribe.module';

describe('SharedUtilNgSubscribeModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedUtilNgSubscribeModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedUtilNgSubscribeModule).toBeDefined();
  });
});

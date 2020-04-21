import {Spectator, createComponentFactory} from '@ngneat/spectator';

import {WrapperComponent} from './wrapper.component';

describe('WrapperComponent', () => {
  let spectator: Spectator<WrapperComponent>;

  const createComponent = createComponentFactory(WrapperComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});

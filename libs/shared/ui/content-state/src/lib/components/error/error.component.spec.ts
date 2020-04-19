import {Spectator, createComponentFactory} from '@ngneat/spectator';

import {ErrorComponent} from './error.component';

describe('ErrorComponent', () => {
  let spectator: Spectator<ErrorComponent>;

  const createComponent = createComponentFactory(ErrorComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});

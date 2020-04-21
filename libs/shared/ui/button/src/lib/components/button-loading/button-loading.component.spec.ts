import {Spectator, createComponentFactory} from '@ngneat/spectator';

import {ButtonLoadingComponent} from './button-loading.component';

describe('ButtonLoadingComponent', () => {
  let spectator: Spectator<ButtonLoadingComponent>;

  const createComponent = createComponentFactory(ButtonLoadingComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});

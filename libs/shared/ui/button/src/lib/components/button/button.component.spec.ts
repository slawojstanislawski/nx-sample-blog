import {Spectator, createComponentFactory} from '@ngneat/spectator';

import {ButtonComponent} from './button.component';

describe('ButtonComponent', () => {
  let spectator: Spectator<ButtonComponent>;

  const createComponent = createComponentFactory(ButtonComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});

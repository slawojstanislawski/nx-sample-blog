import {Spectator, createComponentFactory} from '@ngneat/spectator';

import {LoadingComponent} from './loading.component';

describe('LoadingComponent', () => {
  let spectator: Spectator<LoadingComponent>;

  const createComponent = createComponentFactory(LoadingComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});

import {Spectator, createComponentFactory} from '@ngneat/spectator';

import {TitleRowComponent} from './title-row.component';

describe('TitleRowComponent', () => {
  let spectator: Spectator<TitleRowComponent>;
  const createComponent = createComponentFactory(TitleRowComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});

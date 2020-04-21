import {Spectator, createComponentFactory} from '@ngneat/spectator';

import {ContentComponent} from './content.component';

describe('ContentComponent', () => {
  let spectator: Spectator<ContentComponent>;

  const createComponent = createComponentFactory(ContentComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});

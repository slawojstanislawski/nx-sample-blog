import {Spectator, createComponentFactory} from '@ngneat/spectator';

import {PostCreateComponent} from './post-create.component';

describe('PostCreateComponent', () => {
  let spectator: Spectator<PostCreateComponent>;

  const createComponent = createComponentFactory(PostCreateComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});

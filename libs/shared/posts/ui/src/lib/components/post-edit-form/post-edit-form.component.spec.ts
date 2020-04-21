import {Spectator, createComponentFactory} from '@ngneat/spectator';

import {PostEditFormComponent} from './post-edit-form.component';

describe('PostEditFormComponent', () => {
  let spectator: Spectator<PostEditFormComponent>;

  const createComponent = createComponentFactory(PostEditFormComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});

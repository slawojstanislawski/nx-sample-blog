import {CommonModule} from '@angular/common';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';

import {PostsService} from './services/posts.service';
import * as fromPosts from './+state/posts.reducer';
import {PostsEffects} from './+state/posts.effects';
import {PostsFacade} from './+state/posts.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromPosts.POSTS_FEATURE_KEY, fromPosts.reducer),
    EffectsModule.forFeature([PostsEffects])
  ],
  providers: [PostsFacade, PostsService]
})
export class SharedPostsDataAccessModule {}

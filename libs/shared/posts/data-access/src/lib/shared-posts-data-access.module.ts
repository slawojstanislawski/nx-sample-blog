import {CommonModule} from '@angular/common';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';

import {PostsService} from './services/posts.service';
import {PostsFacade} from '../lib/+state/posts.facade';
import {PostsEffects} from './+state/posts.effects';
import * as fromPosts from './+state/posts.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromPosts.POSTS_FEATURE_KEY, fromPosts.reducer),
    EffectsModule.forFeature([PostsEffects])
  ],
  providers: [PostsFacade, PostsService]
})
export class SharedPostsDataAccessModule {}

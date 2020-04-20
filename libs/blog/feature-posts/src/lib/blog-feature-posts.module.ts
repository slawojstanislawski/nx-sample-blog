import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {PostDetailsComponent} from './components/post-details/post-details.component';
import {PostCreateComponent} from './components/post-create/post-create.component';
import {PostListComponent} from './components/post-list/post-list.component';
import {SharedPostsDataAccessModule} from '@blog/shared/posts/data-access';
import {SharedUtilNgSubscribeModule} from '@blog/shared/util/ng-subscribe';
import {SharedUiContentStateModule} from '@blog/shared/ui/content-state';
import {SharedUiTitleRowModule} from '@blog/shared/ui/title-row';
import {SharedUiButtonModule} from '@blog/shared/ui/button';
import {SharedPostsUiModule} from '@blog/shared/posts/ui';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: PostListComponent
      },
      {
        path: 'new',
        component: PostCreateComponent
      },
      {
        path: ':id',
        component: PostDetailsComponent
      }
    ]),
    SharedPostsDataAccessModule,
    MatCardModule,
    MatListModule,
    ReactiveFormsModule,
    MatButtonModule,
    SharedUiButtonModule,
    SharedUtilNgSubscribeModule,
    SharedPostsUiModule,
    SharedUiContentStateModule,
    MatIconModule,
    SharedUiTitleRowModule
  ],
  declarations: [PostListComponent, PostDetailsComponent, PostCreateComponent]
})
export class BlogFeaturePostsModule {}

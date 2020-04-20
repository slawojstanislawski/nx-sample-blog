import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {
  IsAuthenticatedGuard,
  SharedAuthDataAccessModule
} from '@blog/shared/auth/data-access';
import {HomeComponent} from './components/home/home.component';

@NgModule({
  imports: [
    CommonModule,
    SharedAuthDataAccessModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'posts'
          },
          {
            path: 'posts',
            canActivate: [IsAuthenticatedGuard],
            loadChildren: () =>
              import('@blog/blog/feature-posts').then(
                module => module.BlogFeaturePostsModule
              )
          },
          {
            path: 'auth',
            loadChildren: () =>
              import('@blog/blog/feature-auth').then(
                module => module.BlogFeatureAuthModule
              )
          }
        ]
      }
    ]),
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  declarations: [HomeComponent]
})
export class BlogFeatureShellModule {}

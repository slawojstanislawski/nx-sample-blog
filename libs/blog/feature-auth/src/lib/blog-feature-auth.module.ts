import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {HttpClientModule} from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {SharedUtilNgSubscribeModule} from '@blog/shared/util/ng-subscribe';
import {LoginComponent} from './components/login/login.component';
import {SharedUiButtonModule} from '@blog/shared/ui/button';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'login', pathMatch: 'full', component: LoginComponent},
    ]),
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    HttpClientModule,
    SharedUiButtonModule,
    SharedUtilNgSubscribeModule,
  ],
  declarations: [LoginComponent],
})
export class BlogFeatureAuthModule {}

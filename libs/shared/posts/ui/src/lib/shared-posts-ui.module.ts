import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {PostEditFormComponent} from './components/post-edit-form/post-edit-form.component';
import {SharedUiButtonModule} from '@blog/shared/ui/button';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    SharedUiButtonModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  exports: [PostEditFormComponent],
  declarations: [PostEditFormComponent]
})
export class SharedPostsUiModule {}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PostEditFormComponent} from './components/post-edit-form/post-edit-form.component';
import {SharedUiButtonModule} from '@blog/shared/ui/button';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedUiButtonModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  exports: [PostEditFormComponent],
  declarations: [PostEditFormComponent],
})
export class SharedPostsUiModule {}

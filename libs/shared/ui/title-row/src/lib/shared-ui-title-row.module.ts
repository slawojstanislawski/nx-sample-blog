import {MatCardModule} from '@angular/material/card';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {TitleRowComponent} from './components/title-row/title-row.component';

@NgModule({
  imports: [CommonModule, MatCardModule],
  exports: [TitleRowComponent],
  declarations: [TitleRowComponent],
})
export class SharedUiTitleRowModule {}

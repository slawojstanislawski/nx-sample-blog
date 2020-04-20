import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {WrapperComponent} from './components/wrapper/wrapper.component';
import {LoadingComponent} from './components/loading/loading.component';
import {ErrorComponent} from './components/error/error.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  imports: [CommonModule, MatProgressSpinnerModule],
  declarations: [WrapperComponent, ErrorComponent, LoadingComponent],
  exports: [WrapperComponent, ErrorComponent, LoadingComponent]
})
export class SharedUiContentStateModule {}

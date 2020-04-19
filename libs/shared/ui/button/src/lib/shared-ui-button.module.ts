import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {ButtonLoadingComponent} from './components/button-loading/button-loading.component';
import {SharedUtilNgSubscribeModule} from '@blog/shared/util/ng-subscribe';
import {SharedUiContentStateModule} from '@blog/shared/ui/content-state';
import {ContentComponent} from './components/content/content.component';
import {ButtonComponent} from './components/button/button.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    SharedUtilNgSubscribeModule,
    SharedUiContentStateModule,
  ],
  declarations: [ContentComponent, ButtonComponent, ButtonLoadingComponent],
  exports: [ContentComponent, ButtonComponent, ButtonLoadingComponent],
})
export class SharedUiButtonModule {}

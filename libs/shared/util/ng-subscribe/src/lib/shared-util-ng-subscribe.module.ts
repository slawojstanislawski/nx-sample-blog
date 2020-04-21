import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {NgSubscribeDirective} from './directives/ng-subscribe';

@NgModule({
  imports: [CommonModule],
  declarations: [NgSubscribeDirective],
  exports: [NgSubscribeDirective]
})
export class SharedUtilNgSubscribeModule {}

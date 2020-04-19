import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedDataAccessModuleConfig} from './tokens';
import {ISharedDataAccessModuleConfig} from './types';

@NgModule({
  imports: [CommonModule],
})
export class SharedDataAccessModule {
  static forRoot(
    config: ISharedDataAccessModuleConfig
  ): ModuleWithProviders<SharedDataAccessModule> {
    return {
      ngModule: SharedDataAccessModule,
      providers: [
        {
          provide: SharedDataAccessModuleConfig,
          useValue: config,
        },
      ],
    };
  }
}

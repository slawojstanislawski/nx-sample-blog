import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ErrorMapperService} from './services/error-mapper.service';
import {defaultErrorMappingModuleConfig} from './constants';
import {IErrorMapperModuleConfig} from './types';
import {ErrorMapperModuleConfig} from './tokens';

@NgModule({
  imports: [CommonModule],
  providers: [ErrorMapperService]
})
export class SharedErrorMapperModule {
  private static createModuleWithProviders(
    config: Partial<IErrorMapperModuleConfig>
  ): ModuleWithProviders<SharedErrorMapperModule> {
    return {
      ngModule: SharedErrorMapperModule,
      providers: [
        {
          provide: ErrorMapperModuleConfig,
          useValue: {
            ...defaultErrorMappingModuleConfig,
            ...config
          }
        },
        ErrorMapperService
      ]
    };
  }

  static forRoot(
    config: Partial<IErrorMapperModuleConfig> = {}
  ): ModuleWithProviders<SharedErrorMapperModule> {
    return SharedErrorMapperModule.createModuleWithProviders(config);
  }

  static forFeature(
    config: Partial<IErrorMapperModuleConfig> = {}
  ): ModuleWithProviders<SharedErrorMapperModule> {
    return SharedErrorMapperModule.createModuleWithProviders(config);
  }
}

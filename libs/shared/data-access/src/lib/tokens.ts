import {InjectionToken} from '@angular/core';
import {ISharedDataAccessModuleConfig} from '@blog/shared/data-access';

export const SharedDataAccessModuleConfig = new InjectionToken<
  ISharedDataAccessModuleConfig
>('shared-data-access-module-config');

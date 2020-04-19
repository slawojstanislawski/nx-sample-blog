import {InjectionToken} from '@angular/core';
import {ISharedSnackbarModuleConfig} from './types';

export const SharedSnackbarModuleConfig = new InjectionToken<
  ISharedSnackbarModuleConfig
>('shared_snackbar_module_config');

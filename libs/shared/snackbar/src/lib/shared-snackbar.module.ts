import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SnackbarComponent} from './components/snackbar/snackbar.component';
import {defaultSharedSnackbarModuleConfig} from './contants';
import {SnackbarService} from './services/snackbar.service';
import {SharedSnackbarModuleConfig} from './tokens';
import {ISharedSnackbarModuleConfig} from './types';

@NgModule({
  imports: [CommonModule, MatSnackBarModule, MatIconModule],
  declarations: [SnackbarComponent],
  entryComponents: [SnackbarComponent]
})
export class SharedSnackbarModule {
  static createModuleWithProviders(
    config: Partial<ISharedSnackbarModuleConfig>
  ): ModuleWithProviders<SharedSnackbarModule> {
    return {
      ngModule: SharedSnackbarModule,
      providers: [
        SnackbarService,
        {
          provide: SharedSnackbarModuleConfig,
          useValue: {
            ...defaultSharedSnackbarModuleConfig,
            ...config
          }
        }
      ]
    };
  }

  static forRoot(
    config: Partial<ISharedSnackbarModuleConfig> = {}
  ): ModuleWithProviders<SharedSnackbarModule> {
    return SharedSnackbarModule.createModuleWithProviders(config);
  }

  static forFeature(
    config: Partial<ISharedSnackbarModuleConfig> = {}
  ): ModuleWithProviders<SharedSnackbarModule> {
    return SharedSnackbarModule.createModuleWithProviders(config);
  }
}

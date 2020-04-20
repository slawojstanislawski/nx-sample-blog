import {MatSnackBar} from '@angular/material/snack-bar';
import {Inject, Injectable} from '@angular/core';

import {
  ISharedSnackbarModuleConfig,
  SnackbarConfig,
  SnackbarMessageType
} from '../types';
import {SnackbarComponent} from '../components/snackbar/snackbar.component';
import {SharedSnackbarModuleConfig} from '../tokens';

@Injectable()
export class SnackbarService {
  constructor(
    public readonly snackBar: MatSnackBar,
    @Inject(SharedSnackbarModuleConfig)
    private readonly config: ISharedSnackbarModuleConfig
  ) {}

  private openSnackbar(
    type: SnackbarMessageType,
    message: string,
    duration: number
  ): void {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {
        type,
        message
      },
      duration
    } as SnackbarConfig);
  }

  success = (
    message: string,
    duration = this.config.snackbarDuration
  ): void => {
    this.openSnackbar(SnackbarMessageType.SUCCESS, message, duration);
  };

  failure = (
    message: string,
    duration = this.config.snackbarDuration
  ): void => {
    this.openSnackbar(SnackbarMessageType.FAILURE, message, duration);
  };
}

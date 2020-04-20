import {MatSnackBarConfig} from '@angular/material/snack-bar';

export enum SnackbarMessageType {
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE'
}

export interface ISnackbarData {
  message: string;
  type?: SnackbarMessageType;
}

export type SnackbarConfig = MatSnackBarConfig<ISnackbarData>;

export interface ISharedSnackbarModuleConfig {
  snackbarDuration: number;
}

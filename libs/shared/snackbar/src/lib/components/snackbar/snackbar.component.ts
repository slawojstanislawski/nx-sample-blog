import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';
import {Component, HostBinding, Inject} from '@angular/core';

import {ISnackbarData, SnackbarMessageType} from '../../types';

@Component({
  selector: 'shared-snackbar-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public readonly data: ISnackbarData,
    private readonly snackBarRef: MatSnackBarRef<SnackbarComponent>
  ) {}

  @HostBinding('class.success') get success() {
    return this.data.type === SnackbarMessageType.SUCCESS;
  }

  @HostBinding('class.failure') get failure() {
    return this.data.type === SnackbarMessageType.FAILURE;
  }

  close(): void {
    this.snackBarRef.dismiss();
  }
}

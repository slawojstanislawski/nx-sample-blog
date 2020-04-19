import {Component, Input} from '@angular/core';

@Component({
  selector: 'sh-ui-content-state-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  @Input() isSpinner = true;
  @Input() isSpinnerOnly = false;
  @Input() spinnerDiameter = 20;
  @Input() loadingMessage = 'Loading';
  constructor() {}
}

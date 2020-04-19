import {Component, Input} from '@angular/core';

@Component({
  selector: 'sh-ui-content-state-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent {
  @Input() loading: boolean;
  @Input() loadingWithSpinner = true;
  @Input() loadingMessage = 'Loading';
  @Input() error: string;
  @Input() customErrorMessage = '';

  constructor() {}
}

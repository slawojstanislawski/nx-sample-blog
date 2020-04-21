import {Component, Input} from '@angular/core';

@Component({
  selector: 'sh-ui-content-state-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
  @Input() message = 'An error occurred';
  constructor() {}
}

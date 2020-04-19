import {Component, Input} from '@angular/core';

@Component({
  selector: 'sh-ui-button-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() disabled: boolean;
  @Input() raised: boolean;
  @Input() color: 'default' | 'primary' | 'accent' | 'warn' = 'default';
  constructor() {}
}

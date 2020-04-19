import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'sh-ui-button-button-loading',
  templateUrl: './button-loading.component.html',
  styleUrls: ['./button-loading.component.scss']
})
export class ButtonLoadingComponent {
  @Input() text: string;
  @Input() color: 'default' | 'primary' | 'accent' | 'warn' = 'default';
  @Input() loading: boolean;
  @Output() clicked: EventEmitter<void>;

  constructor() {
    this.clicked = new EventEmitter<void>();
  }

  onClick() {
    this.clicked.emit();
  }
}

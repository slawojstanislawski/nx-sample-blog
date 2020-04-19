import {Component, Input} from '@angular/core';

@Component({
  selector: 'sh-ui-button-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {
  @Input() loading: boolean;
  constructor() {}
}

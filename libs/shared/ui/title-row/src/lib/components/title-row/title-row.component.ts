import {Component, Input} from '@angular/core';

@Component({
  selector: 'sh-ui-title-row',
  templateUrl: './title-row.component.html',
  styleUrls: ['./title-row.component.scss']
})
export class TitleRowComponent {
  @Input() title;
  @Input() subtitle;

  constructor() {}
}

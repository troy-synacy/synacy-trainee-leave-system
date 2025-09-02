import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';


@Component ({
    selector: 'add-button',
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss',
    imports: [
      RouterLink
    ],
    standalone: true
  }
)

export class ButtonComponent{
  @Input() buttonLabel = '';
  @Input() route = '';
}

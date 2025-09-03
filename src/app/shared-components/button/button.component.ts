import {Component, Input} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';


@Component ({
    selector: 'add-button',
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss',
  imports: [
    RouterLink,
    RouterOutlet
  ],
    standalone: true
  }
)

export class ButtonComponent{
  @Input() buttonLabel = '';
  @Input() route = '';
}

export class AddButtonComponent {
}

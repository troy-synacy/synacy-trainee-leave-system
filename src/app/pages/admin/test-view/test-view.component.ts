import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-test-view',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './test-view.component.html',
  styleUrl: './test-view.component.scss'
})
export class TestViewComponent {

}

import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent {
  onSubmit() {
    console.log('Employee saved (will be sent to backend later)');
  }
}

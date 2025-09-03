import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    NgForOf
  ],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent {
  onSubmit() {
    console.log('Employee saved (will be sent to backend later)');
  }

  managers = [
    { id: 1, name: 'Jane Smith' },
    { id: 2, name: 'Mark Lee' },
    { id: 3, name: 'Paul Tan' }
  ];
}

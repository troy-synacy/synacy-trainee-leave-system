import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';
import {ButtonComponent} from '../../../shared-components/button/button.component';

@Component({
  selector: 'app-all-leaves',
  standalone: true,
  imports: [
    NgForOf,
    ButtonComponent
  ],
  templateUrl: './all-leaves.component.html',
  styleUrl: './all-leaves.component.scss'
})
export class AllLeavesComponent {
  employees = [
    { id: 1, name: 'John Doe', manager: 'Jane Smith', totalLeave: 20, current: 5 },
    { id: 2, name: 'Ana Cruz', manager: 'Mark Lee', totalLeave: 15, current: 3 },
    { id: 3, name: 'Carlos Santos', manager: 'Jane Smith', totalLeave: 18, current: 4 },
    { id: 4, name: 'Maria Garcia', manager: 'Paul Tan', totalLeave: 22, current: 6 }
  ];

  editEmployee(employee: any) {
    console.log('Editing employee:', employee);
    // later you can navigate to edit page or open a modal
  }
}

import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared-components/button/button.component';
import {RouterOutlet} from '@angular/router';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    ButtonComponent,
    RouterOutlet
  ],
  templateUrl: './view-employee.component.html',
  styleUrl: './view-employee.component.scss'

})
export class ViewEmployeeComponent {
  sidebarOpen = false;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  employees = [
    { id: 1, name: 'John Doe', manager: 'Jane Smith', totalLeave: 20, current: 5 },
    { id: 2, name: 'Ana Cruz', manager: 'Mark Lee', totalLeave: 15, current: 3 },
    { id: 3, name: 'Carlos Santos', manager: 'Jane Smith', totalLeave: 18, current: 4 },
    { id: 4, name: 'Maria Garcia', manager: 'Paul Tan', totalLeave: 22, current: 6 }
  ];

  editEmployee(employee: any) {
    console.log('Editing employee:', employee);
    // later you can navigate to edit page or open a modal here
  }

}

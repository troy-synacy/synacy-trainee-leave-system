import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared-components/button/button.component';
import {RouterOutlet} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-view-employee',
  standalone: true,
  imports: [RouterOutlet, ButtonComponent, FormsModule],
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent {
  sidebarOpen = false;
  selectedRole = '';

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }


}

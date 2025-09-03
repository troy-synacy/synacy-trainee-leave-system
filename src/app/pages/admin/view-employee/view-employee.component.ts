import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../../shared-components/header/header.component';
import { SidebarComponent } from '../../../shared-components/sidebar/sidebar.component';

@Component({
  selector: 'app-view-employee',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss'],
})
export class ViewEmployeeComponent {
  sidebarOpen = false;
}

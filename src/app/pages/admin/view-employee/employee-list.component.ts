import {Component, OnInit} from '@angular/core';
import {ButtonComponent} from '../../../shared-components/button/button.component';
import {User} from '../models/user.interface';
import {AdminService} from '../service/admin.service';
import {PaginatedUsers} from '../models/paginated-users.interface';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    ButtonComponent,
    RouterLink
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit{
  users: User[] | undefined;
  pageNumber: number | undefined;
  totalUserCount: number | undefined;

  constructor(private readonly adminService: AdminService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(){
    this.adminService.getAllUsers().subscribe({
      next: (response: PaginatedUsers) => {
        this.pageNumber = response.pageNumber;
        this.totalUserCount = response.totalCount
        this.users = response.content;
      },
      error: () => {
        console.log("Error fetching users!");
      }
    })
  }

  editEmployee(employee: any) {
    console.log('Editing employee:', employee);
    // later you can navigate to edit page or open a modal
  }
}

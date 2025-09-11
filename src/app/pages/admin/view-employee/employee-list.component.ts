import {Component, OnInit} from '@angular/core';
import {ButtonComponent} from '../../../shared-components/button/button.component';
import {User} from '../../../models/user.interface';
import {PaginatedUsers} from '../../../models/paginated-users.interface';
import {RouterLink} from '@angular/router';
import {PaginatorComponent} from '../../../shared-components/paginator/paginator.component';
import {PageEvent} from '@angular/material/paginator';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    ButtonComponent,
    RouterLink,
    PaginatorComponent
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit{
  users: User[] | undefined;
  pageNumber: number | undefined;
  totalUserCount: number | undefined;
  pageSize = 5;

  constructor(private readonly userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }
  onPageChange(event: PageEvent) {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadUsers();
  }

  loadUsers(){
    this.userService.getPaginatedUsers(this.pageNumber ?? 1, this.pageSize).subscribe({
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

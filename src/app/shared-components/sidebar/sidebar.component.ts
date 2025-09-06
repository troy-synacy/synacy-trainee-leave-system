import {Component, effect, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonComponent} from '../button/button.component';
import {User} from '../../pages/admin/models/user.interface';
import {UserContext} from '../service/user-context.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedService} from '../service/shared.service';
import {UserSignalService} from '../service/user-signal.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit{
  @Input() open = true;

  usersDropdown: User[] = [];
  selectedId: number | null = null;
  currentUser: User | undefined;
  isInitialUserSet?: boolean;
  adminDefaultPath: string = '/admin/view-employees';
  managerDefaultPath: string = '/manager/leave';
  employeeDefaultPath: string = '/employee/view-leaves';

  constructor(private userContext: UserContext,
              private readonly sharedService: SharedService,
              private readonly userSignalService: UserSignalService,
              private readonly route: Router) {
    effect(() => {
      this.userSignalService.refreshUsers();
      this.loadUsers();
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.sharedService.getAllUsers().subscribe({
      next: (response) => {
        this.usersDropdown = response;
        if(!this.isInitialUserSet && response.length){
          this.isInitialUserSet = true;
          this.selectedId = this.usersDropdown[0].id;
          this.currentUser = this.usersDropdown[0];
          this.route.navigate([this.adminDefaultPath]);
        }
      }
    })
  }

  onChange() {
    if (this.selectedId !== null) {
      const user = this.usersDropdown.find(x => x.id === this.selectedId) ?? null;
      if (user) {
        this.userContext.setUser(user);
        this.currentUser = user;
        this.loadUsers();
      }
    }

    if (this.currentUser?.role == 'HR') {
      this.route.navigate([this.adminDefaultPath]);
    }
    else if (this.currentUser?.role == 'MANAGER') {
      this.route.navigate([this.managerDefaultPath]);
    }
    else {
      this.route.navigate([this.employeeDefaultPath]);
    }
  }
}

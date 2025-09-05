import {Component, effect, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonComponent} from '../button/button.component';
import {User} from '../../pages/admin/models/user.interface';
import {UserContext} from '../service/user-context.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedService} from '../service/shared.service';
import {UserSignalService} from '../service/user-signal.service';

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

  constructor(private userContext: UserContext,
              private readonly sharedService: SharedService,
              private readonly userSignalService: UserSignalService) {
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
  }


}

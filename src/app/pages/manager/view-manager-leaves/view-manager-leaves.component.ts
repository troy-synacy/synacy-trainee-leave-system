import { Component } from '@angular/core';
import {LeaveTableComponent} from '../../../shared-components/leave-table/leave-table.component';
import {UserContext} from '../../../shared-components/service/user-context.service';

@Component({
  selector: 'app-view-manager-leaves',
  standalone: true,
  imports: [
    LeaveTableComponent
  ],
  templateUrl: './view-manager-leaves.component.html',
  styleUrl: './view-manager-leaves.component.scss'
})
export class ViewManagerLeavesComponent {
  currentUserRole?: string;

  constructor(private readonly userContext: UserContext) {
    this.currentUserRole = this.userContext.getUser()?.role;
  }
}

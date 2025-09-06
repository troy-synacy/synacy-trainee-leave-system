import { Component } from '@angular/core';
import {ButtonComponent} from '../../../shared-components/button/button.component';
import {LeaveApplication, LeaveRequest} from '../../manager/model/leave-application.interface';
import {LeaveTableComponent} from '../../../shared-components/leave-table/leave-table.component';
import {UserContext} from '../../../shared-components/service/user-context.service';

@Component({
  selector: 'app-all-leaves',
  standalone: true,
  imports: [
    LeaveTableComponent
  ],
  templateUrl: './view-all-leaves.component.html',
  styleUrl: './view-all-leaves.component.scss'
})
export class ViewAllLeavesComponent {
  leaves: LeaveApplication[] = [];
  userRole?: string;

  constructor(private readonly userContext: UserContext) {
    this.userRole = this.userContext.getUser()?.role;
  }
}

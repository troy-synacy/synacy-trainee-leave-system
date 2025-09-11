import {Component} from '@angular/core';
import {ApplyLeaveComponent} from '../../../shared-components/apply-leave/apply-leave.component';
import {LeaveApplication} from '../../../models/leave-application.interface';
import {UserContext} from '../../../services/user-context.service';

@Component({
  selector: 'app-apply-employee-leave',
  standalone: true,
  imports: [
    ApplyLeaveComponent
  ],
  templateUrl: './apply-employee-leave.component.html',
  styleUrl: './apply-employee-leave.component.scss'
})
export class ApplyEmployeeLeaveComponent {
  leaves: LeaveApplication[] = [];
  userRole?: string;

  constructor(private readonly userContext: UserContext) {
    this.userRole = this.userContext.getUser()?.role;
  }
}

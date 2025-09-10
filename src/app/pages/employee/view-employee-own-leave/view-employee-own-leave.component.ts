import {Component} from '@angular/core';
import {UserLeavesTable} from '../../../shared-components/user-leave-table/user-leaves-table';
import {UserContext} from '../../../services/user-context.service';
import {LeaveApplicationService} from '../../../services/leave-application.service';
import {Observable} from 'rxjs';
import {PaginatedLeaveApplication} from '../../../models/paginated-leave-application.interface';

@Component({
  selector: 'app-view-employee-own-leave',
  standalone: true,
  imports: [
    UserLeavesTable
  ],
  templateUrl: './view-employee-own-leave.component.html',
  styleUrl: './view-employee-own-leave.component.scss'
})
export class ViewEmployeeOwnLeaveComponent {
  currentUserId: number;

  constructor(private readonly leaveApplicationService: LeaveApplicationService,
    private readonly userContext: UserContext) {
    this.currentUserId = this.userContext.getUser()?.id;
  }

  leaves = (pageNumber: number, pageSize: number): Observable<PaginatedLeaveApplication> =>
    this.leaveApplicationService.getLeaves(this.currentUserId, pageNumber, pageSize);
}

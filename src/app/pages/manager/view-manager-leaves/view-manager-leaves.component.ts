import { Component } from '@angular/core';
import {LeaveTableComponent} from '../../../shared-components/leave-table/leave-table.component';
import {UserContext} from '../../../services/user-context.service';
import {LeaveApplicationService} from '../../../services/leave-application.service';
import {Observable} from 'rxjs';
import {PaginatedLeaveApplication} from '../../../models/paginated-leave-application.interface';

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
  currentUserId: number;
  pendingStatus = 'PENDING';

  constructor(private readonly leaveApplicationService: LeaveApplicationService, userContext: UserContext) {
    this.currentUserId = userContext.getUser()?.id;
  }

  leaves = (pageNumber: number, pageSize: number): Observable<PaginatedLeaveApplication> =>
    this.leaveApplicationService.getLeaveApplicationsByManagerIdAndStatus(
      this.currentUserId,
      this.pendingStatus,
      pageNumber,
      pageSize
      )
}

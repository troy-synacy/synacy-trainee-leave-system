import { Component } from '@angular/core';
import {UserLeavesTable} from '../../../shared-components/user-leave-table/user-leaves-table';
import {LeaveApplicationService} from '../../../services/leave-application.service';
import {Observable} from 'rxjs';
import {PaginatedLeaveApplication} from '../../../models/paginated-leave-application.interface';
import {UserContext} from '../../../services/user-context.service';

@Component({
  selector: 'app-view-own-leaves',
  standalone: true,
  imports: [
    UserLeavesTable
  ],
  templateUrl: './view-manager-own-leaves.html',
  styleUrl: './view-manager-own-leaves.scss'
})
export class ViewManagerOwnLeavesComponent {
  currentUserId: number;

  constructor(private readonly leaveApplicationService: LeaveApplicationService, userContext: UserContext) {
    this.currentUserId = userContext.getUser()?.id;
  }

  leaves = (pageNumber: number, pageSize: number): Observable<PaginatedLeaveApplication> =>
    this.leaveApplicationService.getLeaves(this.currentUserId, pageNumber, pageSize);
}

import {Component} from '@angular/core';
import {LeaveApplicationService} from '../../../services/leave-application.service';
import {Observable} from 'rxjs';
import {PaginatedLeaveApplication} from '../../../models/paginated-leave-application.interface';
import {LeaveHistoryTableComponent} from '../../../shared-components/leave-history-table/leave-history-table.component';

@Component({
  selector: 'app-admin-leave-application-history',
  standalone: true,
  imports: [
    LeaveHistoryTableComponent
  ],
  templateUrl: './admin-leave-application-history.component.html',
  styleUrl: './admin-leave-application-history.component.scss'
})
export class AdminLeaveApplicationHistoryComponent{

  pendingStatus = 'PENDING';

  constructor(private readonly leaveApplicationService: LeaveApplicationService) {
  }

  leaves = (pageNumber: number, pageSize: number): Observable<PaginatedLeaveApplication> =>
    this.leaveApplicationService.getLeaveApplicationsByStatusNot(this.pendingStatus, pageNumber, pageSize);
}

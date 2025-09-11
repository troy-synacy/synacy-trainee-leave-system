import {Component} from '@angular/core';
import {LeaveApplicationService} from '../../../services/leave-application.service';
import {UserContext} from '../../../services/user-context.service';
import {Observable} from 'rxjs';
import {PaginatedLeaveApplication} from '../../../models/paginated-leave-application.interface';
import {LeaveHistoryTableComponent} from '../../../shared-components/leave-history-table/leave-history-table.component';

@Component({
  selector: 'app-manager-employees-leave-history',
  standalone: true,
  imports: [
    LeaveHistoryTableComponent
  ],
  templateUrl: './manager-employees-leave-history.component.html',
  styleUrl: './manager-employees-leave-history.component.scss'
})
export class ManagerEmployeesLeaveHistoryComponent{

  private readonly pendingStatus = 'PENDING';
  private readonly currentUserId: number;


  constructor(private readonly leaveApplicationService: LeaveApplicationService,
              private readonly userContext: UserContext) {
    this.currentUserId = this.userContext.getUser()?.id;
  }

  leaves = (pageNumber: number, pageSize: number): Observable<PaginatedLeaveApplication> =>
  this.leaveApplicationService.getLeaveApplicationByManagerIdByStatusNot(this.currentUserId, this.pendingStatus, pageNumber, pageSize);

}

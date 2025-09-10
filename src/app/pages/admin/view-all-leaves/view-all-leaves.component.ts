import { Component } from '@angular/core';
import {LeaveTableComponent} from '../../../shared-components/leave-table/leave-table.component';
import {LeaveApplicationService} from '../../../services/leave-application.service';

@Component({
  selector: 'app-all-leaves',
  standalone: true,
  imports: [
    LeaveTableComponent,
  ],
  templateUrl: './view-all-leaves.component.html',
  styleUrl: './view-all-leaves.component.scss'
})
export class ViewAllLeavesComponent {

  pendingStatus = 'PENDING';

  constructor(private readonly leaveApplicationService: LeaveApplicationService) {
  }

  leaves = (pageNumber: number, pageSize: number) =>
    this.leaveApplicationService.getLeaveApplicationsByStatus(this.pendingStatus, pageNumber, pageSize);

}

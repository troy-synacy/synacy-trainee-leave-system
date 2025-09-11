import {Component, effect} from '@angular/core';
import {UserLeavesTable} from '../../../shared-components/user-leave-table/user-leaves-table';
import {UserContext} from '../../../services/user-context.service';
import {LeaveApplicationService} from '../../../services/leave-application.service';
import {UserSignalService} from '../../../services/user-signal.service';
import {PaginatorComponent} from '../../../shared-components/paginator/paginator.component';
import {PageEvent} from '@angular/material/paginator';
import {LeaveApplication} from '../../../models/leave-application.interface';
import {ConfirmationModalComponent} from '../../../shared-components/confirmation-modal/confirmation-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationData} from '../../../models/confirmation-data.interface';

@Component({
  selector: 'app-view-employee-own-leave',
  standalone: true,
  imports: [
    UserLeavesTable,
    PaginatorComponent
  ],
  templateUrl: './view-employee-own-leave.component.html',
  styleUrl: './view-employee-own-leave.component.scss'
})
export class ViewEmployeeOwnLeaveComponent {
  currentUserId!: number;
  totalCount = 0;
  pageNumber = 1;
  pageSize = 5;
  leaves: LeaveApplication[] = []
  cancelStatus = 'CANCELLED';

  canceled: ConfirmationData = {
    title: 'Cancel Leave Application',
    message: 'Do you want to cancel this application?',
    confirmText: 'Confirm',
    cancelText: 'Cancel'
  }

  constructor(private readonly leaveApplicationService: LeaveApplicationService,
              private readonly userContext: UserContext,
              private readonly userSignalService: UserSignalService,
              private readonly modal: MatDialog
              ) {
    effect(async() => {
      const userChangeListener = this.userSignalService.refreshUsers();
      if(userChangeListener){
        this.currentUserId = this.userContext.getUser()?.id;
        if(this.currentUserId){
          this.fetchLeaves();
        }
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;

    this.fetchLeaves();
  }

  fetchLeaves(){
    console.log(this.pageSize)
    this.leaveApplicationService.getLeaves(this.currentUserId, this.pageNumber, this.pageSize).subscribe({
      next: (response) => {
        this.leaves = response.content;
        this.totalCount = response.totalCount;
        this.pageNumber = response.pageNumber
      }
    })
  }

  cancelLeave(leaveId: number): void {
    console.log("yo" +this.pageSize)
    this.modal.open(ConfirmationModalComponent, {
      width: '360px',
      disableClose: true,
      data: this.canceled
    }).afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.leaveApplicationService.cancelLeave(leaveId, this.cancelStatus).subscribe({
          next: () => this.userSignalService.triggerRefreshUsers(),
          error: (err) => console.error('Error canceling leave:', err)
        });
      }
    });
  }
}

import {Component, effect} from '@angular/core';
import {UserLeavesTable} from '../../../shared-components/user-leave-table/user-leaves-table';
import {LeaveApplicationService} from '../../../services/leave-application.service';
import {UserContext} from '../../../services/user-context.service';
import {PaginatorComponent} from '../../../shared-components/paginator/paginator.component';
import {LeaveApplication} from '../../../models/leave-application.interface';
import {ConfirmationData} from '../../../models/confirmation-data.interface';
import {UserSignalService} from '../../../services/user-signal.service';
import {MatDialog} from '@angular/material/dialog';
import {PageEvent} from '@angular/material/paginator';
import {ConfirmationModalComponent} from '../../../shared-components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-view-own-leaves',
  standalone: true,
  imports: [
    UserLeavesTable,
    PaginatorComponent
  ],
  templateUrl: './view-manager-own-leaves.html',
  styleUrl: './view-manager-own-leaves.scss'
})
export class ViewManagerOwnLeavesComponent {
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
    this.leaveApplicationService.getLeaves(this.currentUserId, this.pageNumber, this.pageSize).subscribe({
      next: (response) => {
        this.leaves = response.content;
        this.totalCount = response.totalCount;
        this.pageNumber = response.pageNumber
      }
    })
  }

  cancelLeave(leaveId: number): void {
    this.modal.open(ConfirmationModalComponent, {
      width: '360px',
      disableClose: true,
      data: this.canceled
    }).afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.leaveApplicationService.changeStatusOfLeaveApplication(leaveId, this.cancelStatus, this.currentUserId).subscribe({
          next: () => this.fetchLeaves(),
          error: (err) => console.error('Error canceling leave:', err)
        });
      }
    });
  }
}


import {Component, effect, inject, Input} from '@angular/core';
import {LeaveApplication} from '../../pages/manager/model/leave-application.interface';
import {LeaveApplicationService} from '../../services/leave-application.service';
import {UserContext} from '../service/user-context.service';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationModalComponent} from '../confirmation-modal/confirmation-modal.component';
import {ConfirmationData} from '../../models/confirmation-data.interface';
import {PaginatorComponent} from '../paginator/paginator.component';
import {PageEvent} from '@angular/material/paginator';
import {UserSignalService} from '../service/user-signal.service';
import {NgClass} from '@angular/common';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-leave-table',
  standalone: true,
  imports: [
    MatButton,
    PaginatorComponent,
    NgClass
  ],
  templateUrl: './leave-table.component.html',
  styleUrl: './leave-table.component.scss'
})
export class LeaveTableComponent{
  @Input() userRole?: string = '';

  private dialog = inject(MatDialog);

  approveStatus = 'APPROVED';
  rejectStatus = 'REJECTED';
  pendingStatus = 'PENDING';

  leaves: LeaveApplication[] = [];
  pageNumber: number | undefined;
  totalUserCount: number | undefined;
  pageSize = 5;
  currentUserId!: number;

  approved: ConfirmationData = {
    title: 'Approve Leave Application',
    message: 'Do you wanna approve this application?',
    confirmText: 'Approve',
    cancelText: 'Cancel'
  }

  rejected: ConfirmationData = {
    title: 'Delete Leave Application',
    message: 'Do you wanna reject this application?',
    confirmText: 'Reject',
    cancelText: 'Cancel'
  }

  constructor(private readonly leaveApplicationService: LeaveApplicationService,
              private readonly userContext: UserContext,
              private readonly userSignalService: UserSignalService,
              private readonly notificationService: NotificationService) {

    effect( async () => {
      this.currentUserId = this.userContext.getUser().id;
      const userChangeListener = this.userSignalService.refreshUsers();
      if (userChangeListener){this.fetchLeaves();}
    });
  }

  onPageChange(event: PageEvent) {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;

    this.fetchLeaves();
  }

  fetchLeaves() {
    if (this.userRole == "HR") {
      this.leaveApplicationService
        .getLeaveApplicationsByStatus(this.pendingStatus, this.pageNumber ?? 1, this.pageSize)
        .subscribe({
          next: (response) => {
            this.leaves = response.content;
            this.pageNumber = response.pageNumber;
            this.totalUserCount = response.totalCount;
          }
        });
    } else {
      this.leaveApplicationService
        .getLeaveApplicationsByManagerIdAndStatus(this.currentUserId, this.pendingStatus, this.pageNumber ?? 1, this.pageSize)
        .subscribe({
          next: (response) => {
            this.leaves = response.content;
            this.pageNumber = response.pageNumber;
            this.totalUserCount = response.totalCount;
          }
        });
    }
  }


  approve(id: number) {
    this.dialog.open(ConfirmationModalComponent, {
      width: '360px',
      disableClose: true,
      data: this.approved,
    }).afterClosed().subscribe(reject => {
      if(reject){
        this.leaveApplicationService.changeStatusOfLeaveApplication(id, this.approveStatus).subscribe({
          next: () =>{
            this.notificationService.success("APPROVED!");
            this.fetchLeaves();
          }
        });
      }
    });
  }

  reject(id: number) {
    this.dialog.open(ConfirmationModalComponent, {
      width: '360px',
      disableClose: true,
      data: this.rejected,
    }).afterClosed().subscribe(reject => {
      if(reject){
        this.leaveApplicationService.changeStatusOfLeaveApplication(id, this.rejectStatus).subscribe({
          next: () => {
            this.notificationService.error("ERROR!");
            this.fetchLeaves();
          }
        });
      }
    });
  }
}

import {Component, effect, inject, Input} from '@angular/core';
import {LeaveApplication} from '../../models/leave-application.interface';
import {LeaveApplicationService} from '../../services/leave-application.service';
import {UserContext} from '../../services/user-context.service';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationModalComponent} from '../confirmation-modal/confirmation-modal.component';
import {ConfirmationData} from '../../models/confirmation-data.interface';
import {PaginatorComponent} from '../paginator/paginator.component';
import {PageEvent} from '@angular/material/paginator';
import {UserSignalService} from '../../services/user-signal.service';
import {NgClass} from '@angular/common';
import {NotificationService} from '../../services/notification.service';
import {Observable} from 'rxjs';
import {PaginatedLeaveApplication} from '../../models/paginated-leave-application.interface';

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
  @Input({required: true})
  data!: (pageNumber: number, pageSize: number) => Observable<PaginatedLeaveApplication>;

  leaves: LeaveApplication[] = [];
  pageNumber = 1;
  pageSize = 5;
  totalCount = 0;
  currentUserId!: number;

  private dialog = inject(MatDialog);

  approveStatus = 'APPROVED';
  rejectStatus = 'REJECTED';

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
    this.data(this.pageNumber, this.pageSize).subscribe({
      next: (response) => {
        this.pageNumber = response.pageNumber;
        this.totalCount = response.totalCount;
        this.leaves = response.content;
      },
      error: () => {
        console.log("Error fetching leaves!");
      }
    })
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
            this.notificationService.error("REJECTED!");
            this.fetchLeaves();
          }
        });
      }
    });
  }
}

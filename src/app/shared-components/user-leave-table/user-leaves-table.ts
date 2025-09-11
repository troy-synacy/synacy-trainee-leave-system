import {Component, effect, Input, OnInit} from '@angular/core';
import {UserContext} from '../../services/user-context.service';
import {LeaveApplication} from '../../models/leave-application.interface';
import {NgClass, NgForOf} from '@angular/common';
import {ConfirmationModalComponent} from '../confirmation-modal/confirmation-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationData} from '../../models/confirmation-data.interface';
import {UserSignalService} from '../../services/user-signal.service';
import {LeaveApplicationService} from '../../services/leave-application.service';
import {PaginatorComponent} from '../paginator/paginator.component';
import {PageEvent} from '@angular/material/paginator';
import {Observable} from 'rxjs';
import {PaginatedLeaveApplication} from '../../models/paginated-leave-application.interface';

@Component({
  selector: 'app-user-leaves-table',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    PaginatorComponent
  ],
  templateUrl: './user-leaves-table.html',
  styleUrl: './user-leaves-table.scss'
})
export class UserLeavesTable implements OnInit{
  @Input({required: true})
  data!: (pageNumber: number, pageSize: number) => Observable<PaginatedLeaveApplication>;

  canceled: ConfirmationData = {
    title: 'Cancel Leave Application',
    message: 'Do you want to cancel this application?',
    confirmText: 'Confirm',
    cancelText: 'Cancel'
  }

  leaves: LeaveApplication[] = [];
  pageNumber = 1;
  totalCount= 0;
  pageSize = 5;
  currentUserId: number | undefined;
  cancelStatus = 'CANCELLED';

  constructor(private userContext: UserContext,
              private userSignal: UserSignalService,
              private leaveApplicationService: LeaveApplicationService,
              private modal: MatDialog) {
    effect(async () => {
      const userChangeListener = this.userSignal.refreshUsers();
      if(userChangeListener){
        this.currentUserId = await this.userContext.getUser()?.id;
        if(this.currentUserId){
          this.fetchLeaves();
        }
      }
    });
  }

  async ngOnInit(): Promise<void> {
    this.currentUserId = await this.userContext.getUser()?.id;
    if(this.currentUserId){
      this.fetchLeaves();
    }
  }

  onPageChange(event: PageEvent) {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;

    this.fetchLeaves();
  }

  fetchLeaves(){
    this.data(this.pageNumber, this.pageSize).subscribe({
      next: (response)=>{
        this.pageSize = response.pageNumber;
        this.totalCount = response.totalCount;
        this.leaves = response.content
      }
    })
  }

  cancelLeave(userId: number): void {
    this.modal.open(ConfirmationModalComponent, {
      width: '360px',
      disableClose: true,
      data: this.canceled
    }).afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.leaveApplicationService.cancelLeave(userId, this.cancelStatus).subscribe({
          next: () => this.fetchLeaves(),
          error: (err) => console.error('Error canceling leave:', err)
        });
      }
    });
  }
}

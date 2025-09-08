import {Component, inject, Input, OnInit} from '@angular/core';
import {UserContext} from '../service/user-context.service';
import {LeaveApplication} from '../../pages/manager/model/leave-application.interface';
import {NgForOf} from '@angular/common';
import {ViewLeaveService} from '../service/view-leave.service';
import {ConfirmationModalComponent} from '../confirmation-modal/confirmation-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationData} from '../../models/confirmation-data.interface';

@Component({
  selector: 'app-user-leaves-table',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './user-leaves-table.html',
  styleUrl: './user-leaves-table.scss'
})
export class UserLeavesTable implements OnInit{
  @Input() userRole?: string;

  private dialog = inject(MatDialog);

  cancelStatus = 'CANCELLED';

  canceled: ConfirmationData = {
    title: 'Cancel Leave Application',
    message: 'Do you want to cancel this application?',
    confirmText: 'Confirm',
    cancelText: 'Cancel'
  }

  leaves: LeaveApplication[] = [];
  currentUserId: number | undefined;

  constructor(private viewLeaveService: ViewLeaveService, private userContext: UserContext) {}

  async ngOnInit(): Promise<void> {
    this.currentUserId = await this.userContext.getUser()?.id;
    if(this.currentUserId){
      this.fetchLeaves();
    }
  }

  fetchLeaves() {
    this.viewLeaveService.getLeaves(this.currentUserId).subscribe({
      next: (data) => {
        console.log('Fetched leaves:', data);
        this.leaves = data;
      },
      error: (err) => console.error('Error fetching leaves:', err)
    });
  }

  cancelLeave(id: number): void {
    this.dialog.open(ConfirmationModalComponent, {
      width: '360px',
      disableClose: true,
      data: this.canceled
    }).afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.viewLeaveService.cancelLeave(id, this.cancelStatus).subscribe({
          next: () => this.fetchLeaves(),
          error: (err) => console.error('Error canceling leave:', err)
        });
      }
    });
  }

}

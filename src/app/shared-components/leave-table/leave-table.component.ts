import {Component, inject, Input, OnInit} from '@angular/core';
import {LeaveApplication} from '../../pages/manager/model/leave-application.interface';
import {LeaveApplicationService} from '../../services/leave-application.service';
import {UserContext} from '../service/user-context.service';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationModalComponent} from '../confirmation-modal/confirmation-modal.component';
import {ConfirmationData} from '../../models/confirmation-data.interface';

@Component({
  selector: 'app-leave-table',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './leave-table.component.html',
  styleUrl: './leave-table.component.scss'
})
export class LeaveTableComponent implements OnInit{
  @Input() userRole?: string = '';

  private dialog = inject(MatDialog);

  approveStatus = 'APPROVED';
  rejectStatus = 'REJECTED';

  leaves: LeaveApplication[] = [];
  currentUserId: number | undefined;

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
              private readonly userContext: UserContext) {
    this.currentUserId = this.userContext.getUser()?.id;
  }

  ngOnInit() {
    this.fetchLeaves();
  }

  fetchLeaves() {
    if(this.userRole == "HR") {
      this.leaveApplicationService.getAllLeaveApplications().subscribe({
        next: (response) => {
          this.leaves = response;
        },
        error: () => {
          console.log("Error fetching leaves yes");
        }
      });
    }
    else if (this.userRole == 'MANAGER'){
      this.leaveApplicationService.getAllLeaveApplicationsByManager(this.currentUserId).subscribe({
        next: (response) => {
          this.leaves = response;
        },
        error: () => {
          console.log("Error fetching leaves");
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
            this.fetchLeaves();
          }
        });
      }
    });
  }
}

import {Component, OnInit} from '@angular/core';
import {LeaveApplicationService} from '../../services/leave-application.service';
import {UserContext} from '../service/user-context.service';
import {LeaveApplication} from '../../pages/manager/model/leave-application.interface';
import {ViewLeaveService} from '../view-leaves/view-leave.service';
import {NgForOf} from '@angular/common';

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
  leaves: LeaveApplication[] = [];
  currentUserId: number | undefined;

  constructor(private viewLeaveService: ViewLeaveService, private userContext: UserContext) {}

  ngOnInit(): void {
    this.currentUserId = this.userContext.getUser()?.id;
    this.fetchLeaves();
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

  cancelLeave(id: number) {
    this.viewLeaveService.cancelLeave(id).subscribe({
      next: () => this.fetchLeaves(),
      error: (err) => console.error('Error cancelling leave:', err)
    });
  }
}

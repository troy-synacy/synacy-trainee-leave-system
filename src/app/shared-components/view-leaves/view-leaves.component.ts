import {Component, OnInit} from '@angular/core';
import {DatePipe,  NgForOf} from '@angular/common';
import {ViewLeaveService} from './view-leave.service';
import {LeaveRequest} from '../../pages/manager/model/leave-application.interface';

@Component({
  selector: 'app-view-leaves',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe
  ],
  templateUrl: './view-leaves.component.html',
  styleUrl: './view-leaves.component.scss'
})
export class ViewLeavesComponent implements OnInit {
  leaves: LeaveRequest[] = [];
  userId = 2; // hardcoded since no auth

  constructor(private viewLeaveService: ViewLeaveService) {}

  ngOnInit(): void {
    this.fetchLeaves();
  }

  fetchLeaves() {
    this.viewLeaveService.getLeaves(this.userId).subscribe({
      next: (data) => {
        console.log('Fetched leaves:', data); // ✅ check console
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

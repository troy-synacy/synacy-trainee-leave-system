import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {ViewLeaveService} from './view-leave.service';
import {LeaveApplication} from '../../pages/manager/model/leave-application.interface';
import {UserContext} from '../service/user-context.service';

@Component({
  selector: 'app-view-leaves',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './view-leaves.component.html',
  styleUrl: './view-leaves.component.scss'
})
export class ViewLeavesComponent implements OnInit {
  leaves: LeaveApplication[] = [];
  userId: number | undefined;

  constructor(private viewLeaveService: ViewLeaveService, private userContext: UserContext) {}

  ngOnInit(): void {
    this.userId = this.userContext.getUser()?.id;
    this.fetchLeaves();
  }

  fetchLeaves() {
    this.viewLeaveService.getLeaves(this.userId).subscribe({
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

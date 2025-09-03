import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {LeaveRequest} from '../model/leave-application.interface';
import {ManagerService} from '../service/manager.service';

@Component({
  selector: 'app-apply-leave',
  standalone: true,
  imports: [
    FormsModule
  ],
  providers: [
    ManagerService
  ],
  templateUrl: './apply-leave.component.html',
  styleUrl: './apply-leave.component.scss'
})
export class ApplyLeaveComponent {
  id: number = 123;
  startDate: string = '';
  endDate: string = '';
  totalDays: number = 0;
  reason: string = '';
  leaveCredits: number = 10;

  constructor(private managerService: ManagerService) {}

  calculateDays() {
    if (this.startDate && this.endDate) {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);

      if (end < start) {
        this.totalDays = 0;
        return;
      }

      let count = 0;
      let current = new Date(start);

      while (current <= end) {
        const day = current.getDay();
        if (day !== 0 && day !== 6) {
          count++;
        }
        current.setDate(current.getDate() + 1);
      }

      this.totalDays = count;
    }
  }

  applyLeave() {
    const leaveRequest: LeaveRequest = {
      id: this.id,
      startDate: this.startDate,
      endDate: this.endDate,
      numberOfDays: this.totalDays,
      reason: this.reason
    };

    this.managerService.createLeave(leaveRequest).subscribe({
      next: (res) => {
        alert('Leave application submitted successfully!');
        console.log(res);
      },
      error: (err) => {
        alert('Error submitting leave application.');
        console.error(err);
      }
    });
  }
}

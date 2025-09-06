import {Component, Input, OnInit} from '@angular/core';
import {LeaveApplication} from '../../pages/manager/model/leave-application.interface';
import {LeaveApplicationService} from '../../services/leave-application.service';
import {UserContext} from '../service/user-context.service';

@Component({
  selector: 'app-leave-table',
  standalone: true,
  imports: [],
  templateUrl: './leave-table.component.html',
  styleUrl: './leave-table.component.scss'
})
export class LeaveTableComponent implements OnInit{
  @Input() userRole?: string = '';

  leaves: LeaveApplication[] = [];
  currentUserId: number | undefined;

  constructor(private readonly leaveApplicationService: LeaveApplicationService,
              private readonly userContext: UserContext) {
    this.currentUserId = this.userContext.getUser()?.id;
    console.log(this.currentUserId);
  }

  ngOnInit() {
    console.log(this.currentUserId);
    this.fetchLeaves();
  }

  fetchLeaves() {
    console.log(this.userRole);
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
    else {
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

  accept() {}

  reject() {}
}

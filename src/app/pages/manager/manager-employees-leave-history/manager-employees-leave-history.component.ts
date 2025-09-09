import {Component, OnInit} from '@angular/core';
import {LeaveApplication} from '../model/leave-application.interface';
import {LeaveApplicationService} from '../../../services/leave-application.service';
import {PageEvent} from '@angular/material/paginator';
import {UserContext} from '../../../shared-components/service/user-context.service';
import {NgClass, NgForOf} from '@angular/common';
import {PaginatorComponent} from '../../../shared-components/paginator/paginator.component';

@Component({
  selector: 'app-manager-employees-leave-history',
  standalone: true,
  imports: [
    NgForOf,
    PaginatorComponent,
    NgClass
  ],
  templateUrl: './manager-employees-leave-history.component.html',
  styleUrl: './manager-employees-leave-history.component.scss'
})
export class ManagerEmployeesLeaveHistoryComponent implements OnInit{

  currentUserId: number;
  leaves: LeaveApplication[] = [];
  pageNumber = 1;
  totalUserCount: number | undefined;
  status: 'APPROVED' | 'REJECTED' | 'CANCELLED' = 'APPROVED';
  private pageSize = 5;


  constructor(private readonly leaveApplicationService: LeaveApplicationService,
              private readonly userContext: UserContext) {
    this.currentUserId = this.userContext.getUser()?.id;
  }

  ngOnInit() {
    this.fetchLeaves();
  }

  onPageChange(event: PageEvent) {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;

    this.fetchLeaves();
  }

  fetchLeaves(){
    this.leaveApplicationService.getAllLeaveApplicationsByManagerAndStatus(this.currentUserId, this.status, this.pageNumber ?? 1, this.pageSize).subscribe({
      next: (response) => {
        this.pageNumber = response.pageNumber;
        this.totalUserCount = response.totalCount
        this.leaves = response.content;
      },
      error: () => {
        console.log("Error fetching leaves!");
      }
    })
  }

}

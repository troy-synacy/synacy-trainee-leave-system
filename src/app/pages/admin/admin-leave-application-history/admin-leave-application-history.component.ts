import {Component, OnInit} from '@angular/core';
import {LeaveApplication} from '../../manager/model/leave-application.interface';
import {LeaveApplicationService} from '../../../services/leave-application.service';
import {PaginatorComponent} from '../../../shared-components/paginator/paginator.component';
import {PageEvent} from '@angular/material/paginator';
import {NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-admin-leave-application-history',
  standalone: true,
  imports: [
    PaginatorComponent,
    NgForOf,
    NgClass
  ],
  templateUrl: './admin-leave-application-history.component.html',
  styleUrl: './admin-leave-application-history.component.scss'
})
export class AdminLeaveApplicationHistoryComponent implements OnInit{

  leaves: LeaveApplication[] = [];
  pageNumber = 1;
  totalUserCount: number | undefined;
  private pageSize = 5;
  pendingStatus = 'PENDING';

  constructor(private readonly leaveApplicationService: LeaveApplicationService) {
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
    this.leaveApplicationService.getLeaveApplicationsByStatusNot(this.pendingStatus, this.pageNumber ?? 1, this.pageSize).subscribe({
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

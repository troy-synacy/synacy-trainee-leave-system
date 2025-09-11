import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {PaginatedLeaveApplication} from '../../models/paginated-leave-application.interface';
import {LeaveApplication} from '../../models/leave-application.interface';
import {PageEvent} from '@angular/material/paginator';
import {PaginatorComponent} from '../paginator/paginator.component';
import {NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-leave-history-table',
  standalone: true,
  imports: [
    PaginatorComponent,
    NgForOf,
    NgClass
  ],
  templateUrl: './leave-history-table.component.html',
  styleUrl: './leave-history-table.component.scss'
})
export class LeaveHistoryTableComponent implements OnInit{
  @Input({required: true})
  data!: (pageNumber: number, pageSize: number) => Observable<PaginatedLeaveApplication>;

  leaves: LeaveApplication[] = [];
  pageNumber = 1;
  pageSize = 5;
  totalCount = 0;

  ngOnInit(): void {
    this.fetchLeaves();
  }

  onPageChange(event: PageEvent){
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.fetchLeaves();
  }

  fetchLeaves() {
    this.data(this.pageNumber, this.pageSize).subscribe({
      next: (response) => {
        this.pageNumber = response.pageNumber;
        this.totalCount = response.totalCount;
        this.leaves = response.content;
      },
      error: () => {
        console.log("Error fetching leaves!");
      }
    })
  }
}

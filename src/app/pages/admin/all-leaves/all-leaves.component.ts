import { Component } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {ButtonComponent} from '../../../shared-components/button/button.component';
import {AllLeavesService} from './all-leaves.service';
import {LeaveApplication, LeaveRequest} from '../../manager/model/leave-application.interface';

@Component({
  selector: 'app-all-leaves',
  standalone: true,
  imports: [
    NgForOf,
    ButtonComponent,
    NgIf
  ],
  templateUrl: './all-leaves.component.html',
  styleUrl: './all-leaves.component.scss'
})
export class AllLeavesComponent {
  leaves: LeaveApplication[] = [];

  constructor(private readonly allLeaveService: AllLeavesService) {}

  ngOnInit() {
    this.fetchAllLeaves();
  }

  fetchAllLeaves() {
    this.allLeaveService.getAllLeaveApplications().subscribe({
      next: (data: LeaveApplication[]) => {
        this.leaves = data;
      },
      error: (err) => {
        console.error('Error fetching leave applications:', err);
      }
    });
  }

}

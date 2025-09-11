import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LeaveApplication} from '../../models/leave-application.interface';
import {NgClass, NgForOf} from '@angular/common';


@Component({
  selector: 'app-user-leaves-table',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
  ],
  templateUrl: './user-leaves-table.html',
  styleUrl: './user-leaves-table.scss'
})
export class UserLeavesTable{
  @Input() leaves!: LeaveApplication[];
  @Output() cancel = new EventEmitter<number>;

  cancelLeave(leaveId: number){
    this.cancel.emit(leaveId);
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {ButtonComponent} from '../button/button.component';
import {LeaveApplication} from '../../pages/manager/model/leave-application.interface';

@Component({
  selector: 'app-leave-table',
  standalone: true,
  imports: [
    ButtonComponent,
  ],
  templateUrl: './leave-table.component.html',
  styleUrl: './leave-table.component.scss'
})
export class LeaveTableComponent implements OnInit{
  @Input() userRole: string = '';

  leaves: LeaveApplication[] = [];

  ngOnInit() {
    this.fetchLeaves();
  }

  fetchLeaves() {

  }
}

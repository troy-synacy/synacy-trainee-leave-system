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
export class ViewLeavesComponent {
}

import { Component } from '@angular/core';
import {UserLeavesTable} from '../../../shared-components/user-leaves-table/user-leaves-table';

@Component({
  selector: 'app-view-employee-own-leave',
  standalone: true,
  imports: [
    UserLeavesTable
  ],
  templateUrl: './view-employee-own-leave.component.html',
  styleUrl: './view-employee-own-leave.component.scss'
})
export class ViewEmployeeOwnLeaveComponent {

}

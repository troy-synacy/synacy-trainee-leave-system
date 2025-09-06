import { Component } from '@angular/core';
import {ApplyLeaveComponent} from '../../../shared-components/apply-leave/apply-leave.component';

@Component({
  selector: 'app-apply-employee-leave',
  standalone: true,
  imports: [
    ApplyLeaveComponent
  ],
  templateUrl: './apply-employee-leave.component.html',
  styleUrl: './apply-employee-leave.component.scss'
})
export class ApplyEmployeeLeaveComponent {

}

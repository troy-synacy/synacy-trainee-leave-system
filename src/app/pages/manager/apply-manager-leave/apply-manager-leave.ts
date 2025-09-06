import { Component } from '@angular/core';
import {ApplyLeaveComponent} from '../../../shared-components/apply-leave/apply-leave.component';

@Component({
  selector: 'app-apply-manager-leave',
  standalone: true,
  imports: [
    ApplyLeaveComponent
  ],
  templateUrl: './apply-manager-leave.html',
  styleUrl: './apply-manager-leave.scss'
})
export class ApplyManagerLeave {

}

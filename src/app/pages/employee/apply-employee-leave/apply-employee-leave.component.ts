import {Component, effect} from '@angular/core';
import {ApplyLeaveComponent} from '../../../shared-components/apply-leave/apply-leave.component';
import {LeaveApplication} from '../../manager/model/leave-application.interface';
import {UserContext} from '../../../shared-components/service/user-context.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NotificationService} from '../../../services/notification.service';

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
  leaves: LeaveApplication[] = [];
  userRole?: string;

  constructor(private readonly userContext: UserContext,
              private readonly snackBar: MatSnackBar,
              private readonly notificationService: NotificationService) {
    this.userRole = this.userContext.getUser()?.role;

    effect(() => {
      const listener = this.notificationService.notificationListener();

      if(listener){
        this.snackBar.open(listener.message, undefined, {
          duration: 3000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: "snack-success",
          politeness: "assertive"
        })
      }
    });
  }
}

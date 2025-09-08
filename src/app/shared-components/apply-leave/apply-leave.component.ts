import {Component, inject, Input, OnInit, signal} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ManagerService } from '../../pages/manager/service/manager.service';
import { DateValidators } from '../validators/date-validator';
import {UserContext} from '../service/user-context.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationData} from '../../models/confirmation-data.interface';
import {ConfirmationModalComponent} from '../confirmation-modal/confirmation-modal.component';
import {NotificationService} from '../../services/notification.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-apply-leave',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.scss']
})
export class ApplyLeaveComponent implements OnInit {
  @Input() userRole?: string = '';
  private notificationService = inject(NotificationService);

  private dialog = inject(MatDialog);
  private hasEnoughCredits(): boolean{
    const requestedDays = this.leaveForm.get('numberOfDays')?.value || 0;
    return requestedDays <= this.credits;
  }

  canceled: ConfirmationData = {
    title: 'Cancel Leave Application?',
    message: 'Are you sure you want to cancel this application?',
    confirmText: 'Confirm',
    cancelText: 'Cancel'
  }

  leaveForm: FormGroup;
  isProcessing = false;
  credits = 0;

  exceedCreditsSignal = signal(false);


  constructor(private readonly managerService: ManagerService, private readonly userContext: UserContext, private readonly userService: UserService
  ) {
    const id = this.userContext.getUser()?.id
    this.leaveForm = new FormGroup({
      userId: new FormControl(id),
      startDate: new FormControl('', [Validators.required, DateValidators.noPastDate(), DateValidators.noWeekends()]),
      endDate: new FormControl('', [Validators.required, DateValidators.noPastDate(), DateValidators.noWeekends()]),
      numberOfDays: new FormControl(''),
      reason: new FormControl(''),
    }, { validators: DateValidators.dateRange() });
  }


  ngOnInit() {
    const userId = this.userContext.getUser()?.id;
    if (userId) {
      this.userService.getUserById(userId).subscribe(user => {
        this.credits = user.remainingLeaveCredits;
      });
    }

    this.leaveForm.get('startDate')?.valueChanges.subscribe(() => this.calculateDays());
    this.leaveForm.get('endDate')?.valueChanges.subscribe(() => this.calculateDays());
  }

  private calculateDays() {
    const start = new Date(this.leaveForm.get('startDate')?.value);
    const end = new Date(this.leaveForm.get('endDate')?.value);

    if (!start || !end || isNaN(start.getTime()) || isNaN(end.getTime())) {
      this.leaveForm.patchValue({ numberOfDays: '' }, { emitEvent: false });
      this.exceedCreditsSignal.set(false);
      return;
    }

    let count = 0;
    const current = new Date(start);
    while (current <= end) {
      const day = current.getDay();
      if (day !== 0 && day !== 6) count++;
      current.setDate(current.getDate() + 1);
    }

    this.leaveForm.patchValue({ numberOfDays: count }, { emitEvent: false });
    this.exceedCreditsSignal.set(count > this.credits);
  }

  applyLeave() {
    if (this.leaveForm.invalid) return;

    this.isProcessing = true;
    const requestBody = this.leaveForm.getRawValue();

    this.managerService.applyLeave(requestBody).subscribe({
        next: () => {
          this.notificationService.success('Successfully Applied Leave Application');

          const userId = this.userContext.getUser()?.id;
          if (userId) {
            this.userService.getUserById(userId).subscribe(user => {
              this.credits = user.remainingLeaveCredits;
            });
          }

          this.leaveForm.reset({ userId: this.userContext.getUser()?.id });
        },
      error: () => {
        alert('There was an error applying for leave.');
      },
      complete: () => {
        this.isProcessing = false;
      }
    });
  }

  cancel() {
    const isFormDirty = this.leaveForm.dirty;
    if (!isFormDirty) {
      this.leaveForm.reset({ userId: this.userContext.getUser()?.id });
      return;
    }

    this.dialog.open(ConfirmationModalComponent, {
      width: '360px',
      data: this.canceled
    }).afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.leaveForm.reset({ userId: this.userContext.getUser()?.id });
      }
    });
  }
}

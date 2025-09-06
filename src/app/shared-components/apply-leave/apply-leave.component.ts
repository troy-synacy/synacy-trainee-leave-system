import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ManagerService } from '../../pages/manager/service/manager.service';
import { NgIf } from '@angular/common';
import { DateValidators } from '../validators/date-validator';

@Component({
  selector: 'app-apply-leave',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.scss'] // <- plural
})
export class ApplyLeaveComponent implements OnInit {
  leaveForm: FormGroup;
  isProcessing = false;

  constructor(private readonly managerService: ManagerService) {
    this.leaveForm = new FormGroup({
      userId: new FormControl(3),
      startDate: new FormControl('', [
        Validators.required,
        DateValidators.noPastDate(),
        DateValidators.noWeekends()
      ]),
      endDate: new FormControl('', [
        Validators.required,
        DateValidators.noPastDate(),
        DateValidators.noWeekends()
      ]),
      numberOfDays: new FormControl(''),
      reason: new FormControl('')
    }, { validators: DateValidators.dateRange() }); // group validator factory called
  }

  ngOnInit() {
    this.leaveForm.get('startDate')?.valueChanges.subscribe(() => this.calculateDays());
    this.leaveForm.get('endDate')?.valueChanges.subscribe(() => this.calculateDays());
  }

  private calculateDays() {
    const start = new Date(this.leaveForm.get('startDate')?.value);
    const end = new Date(this.leaveForm.get('endDate')?.value);

    if (!start || !end || isNaN(start.getTime()) || isNaN(end.getTime())) {
      this.leaveForm.patchValue({ numberOfDays: '' }, { emitEvent: false });
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
  }

  applyLeave() {
    if (this.leaveForm.invalid) return;

    this.isProcessing = true;
    const requestBody = this.leaveForm.getRawValue();

    this.managerService.applyLeave(requestBody).subscribe({
      next: () => {
        alert('Leave applied successfully!');
        this.leaveForm.reset({ userId: 3 }); // keep a consistent default if you like
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
    this.leaveForm.reset();
  }
}

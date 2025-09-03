import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ManagerService} from '../service/manager.service';

@Component({
  selector: 'app-apply-leave',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './apply-leave.component.html',
  styleUrl: './apply-leave.component.scss'
})

export class ApplyLeaveComponent{

  leaveForm: FormGroup;
  isProcessing = false;

  constructor(private readonly managerService: ManagerService) {
    this.leaveForm = new FormGroup({
      userId: new FormControl(2),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      numberOfDays: new FormControl(''),
      reason: new FormControl('')
    })
  }

  applyLeave(){
    if(this.leaveForm.valid){
      this.isProcessing = true;
      console.log("Leave applied:", this.leaveForm.value);

      const requestBody = this.leaveForm.getRawValue();

      this.managerService.applyLeave(requestBody).subscribe({
        next: res => {
          alert('Leave applied successfully!');
          this.leaveForm.reset();
        },
        error: err => {
          this.isProcessing = false;
          alert('There was an error applying for leave.');
        },
        complete: () => {
          this.isProcessing = false;
        }
      })
    }
  }

  cancel(){
    this.leaveForm.reset();
  }

}

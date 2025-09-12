import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {Manager} from '../../../models/manager.interface';
import {UserSignalService} from '../../../services/user-signal.service';
import {NotificationService} from '../../../services/notification.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ApiError} from '../../../models/api-error.interface';
import {UserService} from '../../../services/user.service';
import {LeaveRequest} from '../../../models/leave-application-request.interface';
import {UserRequestDTO} from '../../../models/user-request-DTO.interface';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})

export class AddEmployeeComponent implements OnInit{
  userForm: FormGroup;
  managers: Manager[] = [];

  userNameNotFoundErrorCode: string = 'SAME_USER_NAME';

  constructor(private readonly router: Router,
              private readonly userService: UserService,
              private readonly userSignalService: UserSignalService,
              private readonly notificationService: NotificationService) {
    this.userForm = new FormGroup({
      name: new FormControl(),
      role: new FormControl(),
      leaveCredits: new FormControl(),
      managerId: new FormControl()
    })
  }

  ngOnInit() {
    this.loadManagers();

    this.userForm.get('role')?.valueChanges.subscribe(role => {
      if(role == 'HR'){
        this.userForm.get('leaveCredits')?.reset();
        this.userForm.get('leaveCredits')?.disable();
        this.userForm.get('managerId')?.reset();
        this.userForm.get('managerId')?.disable();
      } else {
        this.userForm.get('leaveCredits')?.enable();
        this.userForm.get('managerId')?.enable();
      }
    })
  }

  loadManagers() {
    this.userService.getAllManagers().subscribe({
      next: (response: Manager[]) => {
        this.managers = response
      },
      error: () => {
        this.managers = [];
        console.log("error fetching managers");
      }
    })
  }

  saveUser () {
    const requestBody: UserRequestDTO = this.userForm.getRawValue();

    if(requestBody.role != 'HR'){
      if(requestBody.leaveCredits == null || requestBody.name == null || requestBody.role == null) {
        this.notificationService.error("Missing fields!");
        return;
      }
    }

    this.userService.saveUser(requestBody).subscribe({
      next: () => {
        this.router.navigate(['/admin/view-employees']);
        this.notificationService.success("Employee successfully created!");
        this.userSignalService.triggerRefreshUsers();
      },
      error: (errorResponse: HttpErrorResponse) => {
        const error: ApiError = (errorResponse.error || {}) as ApiError;
        if(error.errorCode == this.userNameNotFoundErrorCode){
          this.notificationService.error("User name already exists");
        }
      }
    })
  }
}

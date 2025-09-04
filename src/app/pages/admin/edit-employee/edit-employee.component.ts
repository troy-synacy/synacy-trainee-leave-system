import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {AdminService} from '../service/admin.service';
import {Manager} from '../models/manager.interface';
import {UserRequestDTO} from '../models/user-request-DTO.interface';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.scss'
})
export class EditEmployeeComponent implements OnInit{

  userId: string | null;
  userForm: FormGroup;
  managers: Manager[] =[];
  currentManager: Manager | undefined;

  constructor(private readonly router: Router,
              private readonly route: ActivatedRoute,
              private readonly adminService: AdminService) {
    this.userId = this.route.snapshot.paramMap.get('id');

    this.userForm = new FormGroup({
      name: new FormControl(),
      role: new FormControl(),
      leaveCredits: new FormControl(),
      managerId: new FormControl()
    })
  }

  ngOnInit() {
    this.loadManagersAndUser();
  }

  loadUserFields(){
    this.adminService.getUserById(this.userId).subscribe({
      next: (response) => {
        this.currentManager = this.managers.find(m => m.name === response.manager);
        console.log(this.currentManager?.id)
        this.userForm.patchValue({
          name: response.name,
          role: response.role,
          leaveCredits: response.totalLeaveCredits,
          managerId: this.currentManager ? Number(this.currentManager.id) : null
        })
      },
      error: () => {
        console.log("Error fetching user!");
      }
    })
  }

  loadManagersAndUser() {
    this.adminService.getAllManagers().subscribe({
      next: (response: Manager[]) => {
        this.managers = response
        this.loadUserFields()
      },
      error: () => {
        this.managers = [];
        console.log("error fetching managers");
      }
    })
  }

  saveUser() {
    const requestBody: UserRequestDTO = this.userForm.getRawValue();
    console.log(requestBody);
    this.adminService.updateUser(this.userId, requestBody).subscribe({
      next: () => {
        this.router.navigate(['admin/view-employees']);
      },
      error: () => {
        console.log("Error fetching data!");
      }
    });
  }
}

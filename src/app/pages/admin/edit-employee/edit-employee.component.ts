import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {AdminService} from '../service/admin.service';
import {Manager} from '../models/manager.interface';
import {UserRequestDTO} from '../models/user-request-DTO.interface';
import {UserSignalService} from '../../../shared-components/service/user-signal.service';

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
              private readonly adminService: AdminService,
              private readonly userSignalService: UserSignalService) {
    this.userId = this.route.snapshot.paramMap.get('id');

    this.userForm = new FormGroup({
      name: new FormControl(),
      role: new FormControl(),
      leaveCredits: new FormControl(),
      managerId: new FormControl()
    })
  }

  ngOnInit() {
    this.loadManagers()
  }

  loadUser(){
    this.adminService.getUserById(this.userId).subscribe({
      next: (response) => {
        this.currentManager = this.managers.find(m => m.name === response.manager);
        this.userForm.patchValue({
          name: response.name,
          role: response.role,
          leaveCredits: response.totalLeaveCredits,
          managerId: this.currentManager ? Number(this.currentManager.id) : null
        })
        if(response.role === 'MANAGER'){
          this.managers = this.managers.filter(manager => manager.id != response.id);
        }
      },
      error: () => {
        console.log("Error fetching user!");
      }
    })
  }

  loadManagers() {
    this.adminService.getAllManagers().subscribe({
      next: (response: Manager[]) => {
        this.managers = response
        this.loadUser()
      },
      error: () => {
        this.managers = [];
        console.log("error fetching managers");
      }
    })
  }

  saveUser() {
    const requestBody: UserRequestDTO = this.userForm.getRawValue();
    this.adminService.updateUser(this.userId, requestBody).subscribe({
      next: () => {
        this.router.navigate(['admin/view-employees']);
        this.userSignalService.triggerRefreshUsers();
      },
      error: () => {
        console.log("Error fetching data!");
      }
    });
  }
}

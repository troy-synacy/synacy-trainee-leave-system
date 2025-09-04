import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {AdminService} from '../service/admin.service';
import {Manager} from '../models/manager.interface';

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

  constructor(private readonly router: Router, private readonly adminService: AdminService) {
    this.userForm = new FormGroup({
      name: new FormControl(),
      role: new FormControl(),
      leaveCredits: new FormControl(),
      managerId: new FormControl()
    })
  }

  ngOnInit() {
    this.loadManagers();
  }

  loadManagers() {
    this.adminService.getAllManagers().subscribe({
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
    const requestBody = this.userForm.getRawValue();

    this.adminService.saveUser(requestBody).subscribe({
      next: () => {
        this.router.navigate(['view-employees']);
      },
      error: () => {
        console.log("Error saving product!");
      }
    })
  }

  onSubmit() {
    console.log('Employee saved (will be sent to backend later)');
  }
}

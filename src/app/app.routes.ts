import { Routes } from '@angular/router';
import { ViewEmployeeComponent } from './leave-management/admin/view-employee/view-employee.component';
import {AddEmployeeComponent} from './leave-management/admin/add-employee/add-employee.component';
import {EmployeeListComponent} from './leave-management/admin/view-employee/employee-list.component';
import {AllLeavesComponent} from './leave-management/admin/all-leaves/all-leaves.component';

export const routes: Routes = [
  {
    path: '',
    component: ViewEmployeeComponent, // acts as layout
    children: [
      { path: 'employee', component: EmployeeListComponent },
      { path: 'employee/add', component: AddEmployeeComponent },
      { path: 'employee/all-leaves', component: AllLeavesComponent},
      { path: '', redirectTo: 'employee', pathMatch: 'full' }
    ]
  }
];

import { Routes } from '@angular/router';
import {EmployeeListComponent} from './pages/admin/view-employee/employee-list.component';
import {ApplyLeaveComponent} from './pages/manager/apply-leave/apply-leave.component';
import {AddEmployeeComponent} from './pages/admin/add-employee/add-employee.component';

export const routes: Routes = [
  {
    path: 'admin',
    children: [
      {
        path: 'view-employees', component: EmployeeListComponent
      },
      {
        path: 'add-employee', component: AddEmployeeComponent
      }
    ]
  },
  {
    path: 'manager', component: ApplyLeaveComponent,
  },
  {
    path: '**', redirectTo: 'view-employees'
  }
];



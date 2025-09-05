import { Routes } from '@angular/router';
import {EmployeeListComponent} from './pages/admin/view-employee/employee-list.component';
import {ApplyLeaveComponent} from './shared-components/apply-leave/apply-leave.component';
import {AddEmployeeComponent} from './pages/admin/add-employee/add-employee.component';
import {EditEmployeeComponent} from './pages/admin/edit-employee/edit-employee.component';
import {AllLeavesComponent} from './pages/admin/all-leaves/all-leaves.component';
import {ViewLeavesComponent} from './shared-components/view-leaves/view-leaves.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'admin/view-employees'
  },
  {
    path: 'admin',
    children: [
      {
        path: 'view-employees', component: EmployeeListComponent
      },
      {
        path: 'add-employee', component: AddEmployeeComponent
      },
      {
        path: 'edit-employee/:id', component: EditEmployeeComponent
      },
      {
        path: 'view-leaves', component: AllLeavesComponent
      }
    ]
  },
  {
    path: 'manager',
    children: [
      {
        path: 'apply-leave', component: ApplyLeaveComponent
      },
      {
        path: 'view-leaves', component: ViewLeavesComponent
      }
    ]
  },
  {
    path: 'employee',
    // component: ViewLeavesComponent,
    children: [
      {
        path: 'view-leaves', component: ViewLeavesComponent
      },
      {
        path: 'apply-leave', component: ApplyLeaveComponent
      }
    ]
  },
  {
    path: '**', redirectTo: 'view-employees'
  }
];



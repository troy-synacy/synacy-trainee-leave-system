import { Routes } from '@angular/router';
import {EmployeeListComponent} from './pages/admin/view-employee/employee-list.component';
import {AddEmployeeComponent} from './pages/admin/add-employee/add-employee.component';
import {EditEmployeeComponent} from './pages/admin/edit-employee/edit-employee.component';
import {ViewAllLeavesComponent} from './pages/admin/view-all-leaves/view-all-leaves.component';
import {ViewManagerLeavesComponent} from './pages/manager/view-manager-leaves/view-manager-leaves.component';
import {ViewManagerOwnLeavesComponent} from './pages/manager/view-manager-own-leaves/view-manager-own-leaves';
import {ApplyManagerLeave} from './pages/manager/apply-manager-leave/apply-manager-leave';

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
        path: 'view-leaves', component: ViewAllLeavesComponent
      }
    ]
  },
  {
    path: 'manager',
    children: [
      {
        path: 'apply-leave', component: ApplyManagerLeave
      },
      {
        path: 'my-leave', component: ViewManagerOwnLeavesComponent
      },
      {
        path: 'leave', component: ViewManagerLeavesComponent
      }
    ]
  },
  {
    path: 'employee',
    children: [
      // {
      //   path: 'view-leaves', component: ViewLeavesComponent
      // },
      // {
      //   path: 'apply-leave', component: ApplyLeaveComponent
      // }
    ]
  },
  {
    path: '**', redirectTo: 'admin/view-employees'
  }
];



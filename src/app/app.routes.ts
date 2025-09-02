import { Routes } from '@angular/router';
import { ViewEmployeeComponent } from './leave-management/admin/view-employee/view-employee.component';
import {AddEmployeeComponent} from './leave-management/admin/add-employee/add-employee.component';

export const routes: Routes = [
  {
    path: 'employee',
    children: [
      { path: '', component: ViewEmployeeComponent },        // list view
      { path: 'add', component: AddEmployeeComponent }   // add employee
      // you can also add: { path: 'edit/:id', component: EditEmployeeComponent }
    ]
  },
  {
    path: '**',
    redirectTo: 'employee'
  }
];

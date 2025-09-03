import { Routes } from '@angular/router';
import {EmployeeListComponent} from './pages/admin/view-employee/employee-list.component';
import {ViewEmployeeComponent} from './pages/admin/view-employee/view-employee.component';
import {TestViewComponent} from './pages/admin/test-view/test-view.component';
import {AppComponent} from './app.component';
import {ApplyLeaveComponent} from './pages/manager/apply-leave/apply-leave.component';

export const routes: Routes = [{
  path: 'test', component: TestViewComponent,

},
  {
    path: 'view-employee', component: EmployeeListComponent,
  },
  {
    path: 'manager', component: ApplyLeaveComponent,
  },
  {
    path: '**', redirectTo: 'test'
  }
];



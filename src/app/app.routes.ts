import { Routes } from '@angular/router';
import {EmployeeListComponent} from './pages/admin/view-employee/employee-list.component';
import {ViewEmployeeComponent} from './pages/admin/view-employee/view-employee.component';
import {TestViewComponent} from './pages/admin/test-view/test-view.component';
import {AppComponent} from './app.component';

export const routes: Routes = [{
  path: 'test', component: TestViewComponent,

},
  {
    path: 'view-employee', component: EmployeeListComponent,
  },
  {
    path: '**', redirectTo: 'test'
  }
];



import { Component } from '@angular/core';
import {UserLeavesTable} from '../../../shared-components/user-leaves-table/user-leaves-table';

@Component({
  selector: 'app-view-own-leaves',
  standalone: true,
  imports: [
    UserLeavesTable
  ],
  templateUrl: './view-manager-own-leaves.html',
  styleUrl: './view-manager-own-leaves.scss'
})
export class ViewManagerOwnLeavesComponent {

}

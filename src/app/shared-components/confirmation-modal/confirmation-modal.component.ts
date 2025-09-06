import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {ConfirmationData} from '../../models/confirmation-data.interface';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss'
})
export class ConfirmationModalComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmationModalComponent, boolean>,
              @Inject(MAT_DIALOG_DATA) public data: ConfirmationData) {}
}

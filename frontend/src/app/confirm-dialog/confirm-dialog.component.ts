import { Component, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA, 
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  imports: [
    MatDialogModule,
    MatDialogActions,
    MatDialogContent,
    MatButton,
    MatDialogTitle
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) 
    public data: { message: string }
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false); // User clicked "Cancel"
  }

  onYesClick(): void {
    this.dialogRef.close(true); // User clicked "Yes"
  }
}

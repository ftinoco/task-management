import { Component } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-create',
  imports: [
    MatDialogModule,
    MatDialogActions,
    MatDialogContent,
    MatButton,
    MatDialogTitle,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    CommonModule
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class CreateComponent {

  descCharLength: number = 256;
  globalError: string = '';
  taskForm = new FormGroup({
    title: new FormControl('', [ Validators.required]),
    description: new FormControl('', [Validators.maxLength(this.descCharLength)]),
    dueDate: new FormControl(null, [Validators.required]),
    status: new FormControl('', [Validators.required])
  });
  statuses: string[] = ['PENDING', 'COMPLETED'];

  constructor(
    public dialogRef: MatDialogRef<CreateComponent>,
    public taskService: TaskService
  ) { }

  onCancelClick(): void {
    this.dialogRef.close(false); // User clicked "Cancel"
  }

  onSaveClick(): void {
    if (this.taskForm.invalid) {
      return;
    }
    console.log(this.taskForm.value);
    this.taskService.create(this.taskForm.value)
    .subscribe((res: any) => { 
      console.log(res);
      if (res.id) {
        this.dialogRef.close(true); // User clicked "Yes"
      } else {
        console.error('Something went wrong!');
      }
    }, (err) => {
      console.error(err);
      this.globalError = 'Something went wrong!';
    });
  }
}


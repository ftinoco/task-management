import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { TaskService } from '../task.service';
import { Task } from '../task';
import { Observable } from 'rxjs';

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

  taskId: number = 0;
  globalError: string = '';
  descCharLength: number = 256;
  dialogTitle: string = 'New Task';
  statuses: string[] = ['PENDING', 'COMPLETED'];

  taskForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.maxLength(this.descCharLength)]),
    dueDate: new FormControl<Date | null>(null, [Validators.required]),
    status: new FormControl('', [Validators.required])
  });

  constructor(
    public dialogRef: MatDialogRef<CreateComponent>,
    public taskService: TaskService,
    @Inject(MAT_DIALOG_DATA)
    public data: number
  ) {
    if (data) {
      this.taskId = data;
      this.getTaskDetail();
      this.dialogTitle = `Edit task - Id: ${data}`
    }
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  getTaskDetail(): void {
    this.taskService.find(this.taskId).subscribe((data: Task) => {
      this.taskForm.setValue({
        description: data.description,
        dueDate: data.dueDate,
        status: data.status,
        title: data.title
      });
    });
  }

  onSaveClick(): void {
    if (this.taskForm.invalid) {
      return;
    }
    let result: Observable<any>;
    if (this.taskId > 0) {
      result = this.taskService.update({
        ... this.taskForm.value,
        id: this.taskId
      });
    } else {
      result = this.taskService.create(this.taskForm.value);
    }

    result.subscribe({
      next: (res: any) => {
        if (res.id) {
          this.dialogRef.close(true);
        } else {
          console.error('Something went wrong!');
          this.globalError = 'Something went wrong!';
        }
      },
      error: (err) => {
        console.error(err);
        this.globalError = 'Something went wrong!';
      }
    });
  }
}
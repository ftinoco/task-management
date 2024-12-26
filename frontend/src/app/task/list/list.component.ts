import { Component } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { CreateComponent } from '../create/create.component';

@Component({
  selector: 'app-list',
  imports: [
    MatTableModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatIcon,
    CommonModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  tasks: Task[] = [];
  displayedColumns: string[] = ['id', 'title', 'description', 'dueDate', 'status', 'actions'];

  constructor(
    public taskService: TaskService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadTable();
  }

  loadTable(): void {
    this.taskService.getAll().subscribe((data: Task[]) => {
      this.tasks = data;
      console.log(data);
    })
  }

  addTask(): void {
    const dialogRef = this.dialog.open(CreateComponent, {
      width: '600px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTable();
      }
    });
  }

  editTask(id: number): void {
    console.log(id);
  }

  deleteTask(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: 'Are you sure you want to delete this task?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('User confirmed the action!');
        // Perform the action here
        this.taskService.delete(id).subscribe(res => {
          this.tasks = this.tasks.filter(item => item.id !== id);
          console.log('Task deleted successfully!');
        })
      } else {
        console.log('User canceled the action.');
      }
    });
  }
}

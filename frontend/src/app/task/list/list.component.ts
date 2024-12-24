import { Component } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  imports: [
    MatTableModule, MatButton,
    MatCard, MatCardContent, MatCardHeader,
    MatCardSubtitle, MatCardTitle, MatIcon,
    CommonModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  tasks: Task[] = [];
  displayedColumns: string[] = ['id', 'title', 'description', 'dueDate', 'status', 'actions'];

  constructor(public taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getAll().subscribe((data: Task[]) => {
      this.tasks = data;
      console.log(data);
    })
  }

  addTask(): void {

  }
  
  editTask(id: number): void {
    console.log(id);
  } 

  deleteTask(id: number): void {
    console.log(id);
  }
}

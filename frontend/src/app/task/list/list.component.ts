import { Component } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { MatTableModule } from '@angular/material/table'; 

@Component({
  selector: 'app-list',
  imports: [MatTableModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  tasks: Task[] = [];
  displayedColumns: string[] = ['id', 'title', 'description', 'dueDate', 'status'];

  constructor(public taskService: TaskService) { }

  ngOnInit(): void{
    this.taskService.getAll().subscribe((data: Task[]) => {
      this.tasks = data;
      console.log(data);
    })
  }
}

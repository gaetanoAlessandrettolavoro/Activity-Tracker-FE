import { Component, OnInit } from '@angular/core';
import { ServiceTasksService } from '../../servizi/service-tasks.service';
import { Task } from '../../models/taskModel';
import { DatePipe, NgForOf } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-task',
  templateUrl: './task-crud.component.html',
  styleUrls: ['./task-crud.component.css'],
  standalone:true,
  imports:[DatePipe,TableModule,NgForOf]
})

export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  cols = [
    { field: '_id', header: 'ID Task' },
    { field: 'taskName', header: 'Nome Task' }
   
  ];

  constructor(private Taskservice: ServiceTasksService) { }

  ngOnInit(): void {
    this.readTask();
  }

  readTask() {
    this.Taskservice.getAllTasks().subscribe((res: any) => {
      this.tasks = res.data.document;
      console.log(this.tasks);
    });
  }

  deleteTask(id: string) {
    this.Taskservice.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(task => task._id !== id);
    });
  }
} 
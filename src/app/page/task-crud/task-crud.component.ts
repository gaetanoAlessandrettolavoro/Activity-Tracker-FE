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
export class TaskComponent implements OnInit{
  tasks: Task[]=[];
  constructor(private Taskservice:ServiceTasksService){

  }

  readTask() {
    this.Taskservice.getAllTasks().subscribe({
      next:(res:any)=>{
       this.tasks = res.data.document
       console.log(this.tasks)

      }
    })
  }
  ngOnInit(): void {
    this.readTask();
  }


  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }
}

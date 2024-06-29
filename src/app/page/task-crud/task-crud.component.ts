import { Component, OnInit } from '@angular/core';
import { ServiceTasksService } from '../../servizi/service-tasks.service';
import { Task } from '../../models/taskModel';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { AddTypeActivityComponent } from '../../componenti/add-type-activity/add-type-activity.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ErrorServiziService } from '../../servizi/error-servizi.service';
import { Router } from '@angular/router';
import { UserServiceService } from '../../servizi/user-service.service';

@Component({
  selector: 'app-task',
  templateUrl: './task-crud.component.html',
  styleUrls: ['./task-crud.component.css'],
  standalone:true,
  imports:[DatePipe,TableModule,NgForOf, ProgressBarModule, AddTypeActivityComponent, ToastModule, NgIf],
  providers: [MessageService]
})

export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  cols = [
    { field: '', header: '' },
    { field: 'taskName', header: 'Nome Task' },
    { field: 'state', header: 'Stato' },
    { field: 'progressState', header: 'Progresso' },
    { field: '', header: '' },
  ];

  constructor(private Taskservice: ServiceTasksService, private messageService: MessageService, private errors: ErrorServiziService, private router: Router, private userService: UserServiceService) { }

  showError(statusCode: number) {
    if(statusCode === 401 || statusCode === 429) {
      this.messageService.add(this.errors.getErrorMessage(statusCode));
      setTimeout(() => {
        this.userService.logout();
        this.router.navigate(['/login']);
      }, 3000);
    } else {
      this.messageService.add(this.errors.getErrorMessage(statusCode));
    }
  }

  ngOnInit(): void {
    this.readTask();
  }

  getTasks(): void {
    this.Taskservice.getAllTasks().subscribe({
      next: (res: any) => {
        this.tasks = res.data.document;
        console.log(this.tasks);
      },
      error: (error) => this.showError(error.status)
    });
  }

  readTask() {
    this.getTasks();
  }

  deleteTask(id: string) {
    this.Taskservice.deleteTask(id).subscribe({
      next: (res) => {
        this.getTasks();
      },
      error: (error) => this.showError(error.status)
    });
  }
} 
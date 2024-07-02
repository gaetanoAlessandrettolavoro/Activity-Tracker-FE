import { Component, OnInit, signal } from '@angular/core';
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
import { DialogModule } from 'primeng/dialog';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { KnobModule } from 'primeng/knob';

@Component({
  selector: 'app-task',
  templateUrl: './task-crud.component.html',
  styleUrls: ['./task-crud.component.css'],
  standalone:true,
  imports:[DatePipe,TableModule,NgForOf, ProgressBarModule, AddTypeActivityComponent, ToastModule, NgIf, DialogModule, ReactiveFormsModule, InputTextModule, DropdownModule, KnobModule, FormsModule],
  providers: [MessageService]
})

export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  cols = [
    { field: '', header: '' },
    { field: 'taskName', header: 'Nome Task' },
    { field: 'state', header: 'Stato' },
    { field: 'expectedHours', header: 'Tempo previsto' },
    { field: 'progressState', header: 'Progresso' },
    { field: '', header: '' },
    { field: '', header: '' }
  ];
  visibleEdit: boolean = false;
  taskToEdit = signal<Task>({} as Task);
  taskNameToEdit!: string;
  stateToEdit!: string;
  states: string[] = ['To do', 'In progress', 'Done'];
  progress: number = 0;
  filterOptions: string[] = ['Solo attive', 'Solo non attive', 'Tutte'];
  filter: string = this.filterOptions[2];

  editTaskForm = new FormGroup({
    taskName: new FormControl(this.taskToEdit().taskName, Validators.required),
    state: new FormControl(this.taskToEdit().state, Validators.required),
    progressState: new FormControl(this.taskToEdit().progressState, Validators.required)
  })

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

  filterTasks() {
    if(this.filter === 'Solo attive') {
      this.Taskservice.getAllTasks({isActive: true}).subscribe({
        next: (res: any) => {
          this.tasks = res.data.document;
        },
        error: (error) => this.showError(error.status)
      });
    } else if(this.filter === 'Solo non attive') {
      this.Taskservice.getAllTasks({isNoActive: true}).subscribe({
        next: (res: any) => {
          this.tasks = res.data.document;
        },
        error: (error) => this.showError(error.status)
      });
    } else {
      this.getTasks();
    }
  }

  getTasks(): void {
    this.Taskservice.getAllTasks().subscribe({
      next: (res: any) => {
        this.tasks = res.data.document;
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

  reopenTask(taskID: string){
    this.Taskservice.getSingleTask(taskID).subscribe({
      next: (res: any) => {
        const taskToReopen = {...res.data.document, isActive: true}
        this.Taskservice.updateTask(taskToReopen).subscribe({
          next: (result: any) => {
            this.getTasks();
          },
          error: (error) => this.showError(error.status)
        })
      },
      error: (err) => this.showError(err.status)
    })
  }

  editTask(id: string) {
    this.Taskservice.getSingleTask(id).subscribe({
      next: (result: any) => {
        this.taskToEdit.set(result.data.document);
        this.taskNameToEdit = this.taskToEdit().taskName;
        this.stateToEdit = result.data.document.state;
        this.progress = result.data.document.progressState;
        this.visibleEdit = true;
      },
      error: (error) => this.showError(error.status)
    })
  }

  disableKnob() {
    return this.editTaskForm.value.state === 'To do' || this.editTaskForm.value.state === 'Done';
  }

  onSubmitEditTask() {
    if(this.editTaskForm.valid) {
      const updatedTask = {...this.editTaskForm.value, isActive: true, _id: this.taskToEdit()._id};
      if(updatedTask.state === 'To do'){
        updatedTask.progressState = 1;
      }
      if(updatedTask.state === 'Done') {
        updatedTask.progressState = 100;
      }
      //@ts-ignore
      this.Taskservice.updateTask(updatedTask).subscribe({
        next: (res) => {
          this.getTasks();
          this.visibleEdit = false;
        },
        error: (error) => {
          console.error(error);
          this.showError(error.status)}
      })
    } else {
      this.showError(1);
    }
  }
} 
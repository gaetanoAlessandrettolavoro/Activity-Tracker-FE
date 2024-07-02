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
import { ActivitiesServicesService } from '../../servizi/activities-services.service';
import { Activity } from '../../models/activityModel';

@Component({
  selector: 'app-task',
  templateUrl: './task-crud.component.html',
  styleUrls: ['./task-crud.component.css'],
  standalone:true,
  imports:[DatePipe,TableModule,NgForOf, ProgressBarModule, AddTypeActivityComponent, ToastModule, NgIf, DialogModule, ReactiveFormsModule, InputTextModule, DropdownModule, FormsModule],
  providers: [MessageService]
})

export class TaskComponent implements OnInit {
  tasks: Task[] = [];
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

  constructor(private Taskservice: ServiceTasksService, private messageService: MessageService, private errors: ErrorServiziService, private router: Router, private userService: UserServiceService, private activitiesService: ActivitiesServicesService) { }

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

  interval = setInterval(() => {
    this.getTasks(this.filter);
  }, 60 * 1000);

  updateProgress(taskID: Task["_id"]) {
    this.activitiesService.getActivityByTaskID(taskID).subscribe({
      next: (res: any) => {
        let activities: Activity[] = res.data.document;
        let taskToUpdate: Task;
        let sumHours: number = 0;
        for(let act of activities) {
          if(!!act.hours) {
            sumHours += parseFloat(act.hours);
          }
        }
        this.Taskservice.getSingleTask(taskID).subscribe({
          next: (result: any) => {
            taskToUpdate = result.data.document;
            //@ts-ignore
            let newProgress = (sumHours*100)/taskToUpdate.expectedHours;
            const updatedTask: Task = {...taskToUpdate, progressState: newProgress};
            this.Taskservice.updateTask(updatedTask).subscribe({
              next: (ress: any) => {},
              error: (err) => this.showError(err.status)
            })
          },
          error: (error) => this.showError(error.status)
        })
      },
      error: (err) => this.showError(err.status)
    })
  }

  ngOnInit(): void {
    this.getTasks();
  }

  filterTasks() {
    this.getTasks(this.filter);
  }

  getTasks(filter?: string): void {
    if(!filter) {
      this.Taskservice.getAllTasks().subscribe({
        next: (res: any) => {
          let tasks = res.data.document;
          for(let i = 0; i < tasks.length; i++ ) {
            this.updateProgress(tasks[i]._id);
            if(i === (tasks.length - 1)) {
              this.Taskservice.getAllTasks().subscribe({
                next: (result: any) => {
                  this.tasks = result.data.document;
                },
                error: (err) => this.showError(err.status)
              })
            }
          }
        },
        error: (error) => this.showError(error.status)
      });
    } else {
      if(this.filter === 'Solo attive') {
        this.Taskservice.getAllTasks().subscribe({
          next: (res: any) => {
            let tasks = res.data.document;
            for(let i = 0; i < tasks.length; i++ ) {
              this.updateProgress(tasks[i]._id);
              if(i === (tasks.length - 1)) {
                this.Taskservice.getAllTasks({isActive: true}).subscribe({
                  next: (result: any) => {
                    this.tasks = result.data.document;
                  },
                  error: (err) => this.showError(err.status)
                })
              }
            }
          },
          error: (error) => this.showError(error.status)
        });
      } else if(this.filter === 'Solo non attive') {
        this.Taskservice.getAllTasks().subscribe({
          next: (res: any) => {
            let tasks = res.data.document;
            for(let i = 0; i < tasks.length; i++ ) {
              this.updateProgress(tasks[i]._id);
              if(i === (tasks.length - 1)) {
                this.Taskservice.getAllTasks({isNoActive: true}).subscribe({
                  next: (result: any) => {
                    this.tasks = result.data.document;
                  },
                  error: (err) => this.showError(err.status)
                })
              }
            }
          },
          error: (error) => this.showError(error.status)
        });
      } else {
        this.getTasks();
      }
    }
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
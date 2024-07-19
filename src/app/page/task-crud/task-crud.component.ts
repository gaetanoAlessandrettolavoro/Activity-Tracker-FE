import { Component, OnInit, signal } from '@angular/core';
import { ServiceTasksService } from '../../servizi/service-tasks.service';
import { Task } from '../../models/taskModel';
import { DatePipe, DecimalPipe, NgForOf, NgIf } from '@angular/common';
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
import { InputNumberModule } from 'primeng/inputnumber';
import { LoggingService } from '../../servizi/logging.service'; 

@Component({
  selector: 'app-task',
  templateUrl: './task-crud.component.html',
  styleUrls: ['./task-crud.component.css'],
  standalone:true,
  imports:[DatePipe,TableModule,NgForOf, ProgressBarModule, AddTypeActivityComponent, ToastModule, NgIf, DialogModule, ReactiveFormsModule, InputTextModule, DropdownModule, FormsModule, DecimalPipe, InputNumberModule],
  providers: [MessageService]
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  visibleEdit: boolean = false;
  taskToEdit = signal<Task>({} as Task);
  taskNameToEdit!: string;
  expectedHoursToEdit!: number;
  filterOptions: string[] = ['Solo attive', 'Solo non attive', 'Tutte'];
  filter: string = this.filterOptions[2];
  sumHoursArr: Array<{taskID: string, sumHours: number}> = [];
  first = 0;
  rows = 5;

  editTaskForm = new FormGroup({
    taskName: new FormControl(this.taskToEdit().taskName, Validators.required),
    expectedHours: new FormControl(this.taskToEdit().expectedHours, Validators.required)
  })

  constructor(
    private Taskservice: ServiceTasksService, 
    private messageService: MessageService, 
    private errors: ErrorServiziService, 
    private router: Router, 
    private userService: UserServiceService, 
    private activitiesService: ActivitiesServicesService,
    private loggingService: LoggingService  
  ) { }

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

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
    this.loggingService.error(`Error ${statusCode}`);  
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
        for(let i = 0; i < activities.length; i++) {
          if(!!activities[i].hours) {
            //@ts-ignore
            sumHours += parseFloat(activities[i].hours);
            if(i === (activities.length-1)) {
              this.sumHoursArr.push({taskID: activities[i].taskID, sumHours: sumHours});
            }
          }
        }
        this.Taskservice.getSingleTask(taskID).subscribe({
          next: (result: any) => {
            taskToUpdate = result.data.document;
            //@ts-ignore
            let newProgress = (sumHours*100)/taskToUpdate.expectedHours;
            if(newProgress >= 100) newProgress = 100;
            const updatedTask: Task = {...taskToUpdate, progressState: newProgress};
            this.Taskservice.updateTask(updatedTask).subscribe({
              next: (ress: any) => {},
              error: (err) => {
                this.showError(err.status);
                this.loggingService.error(`Failed to update task progress: ${err.message}`);  
              }
            })
          },
          error: (error) => {
            this.showError(error.status);
            this.loggingService.error(`Failed to get single task for progress update: ${error.message}`);  
          }
        })
      },
      error: (err) => {
        this.showError(err.status);
        this.loggingService.error(`Failed to get activities by task ID: ${err.message}`);  
      }
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
                error: (err) => {
                  this.showError(err.status);
                  this.loggingService.error(`Failed to get all tasks: ${err.message}`); 
                }
              })
            }
          }
        },
        error: (error) => {
          this.showError(error.status);
          this.loggingService.error(`Failed to get all tasks: ${error.message}`);  
        }
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
                  error: (err) => {
                    this.showError(err.status);
                    this.loggingService.error(`Failed to get active tasks: ${err.message}`);
                  }
                });
              }
            }
          },
          error: (error) => {
            this.showError(error.status);
            this.loggingService.error(`Failed to get active tasks: ${error.message}`);  
          }
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
                  error: (err) => {
                    this.showError(err.status);
                    this.loggingService.error(`Failed to get inactive tasks: ${err.message}`); 
                  }
                })
              }
            }
          },
          error: (error) => {
            this.showError(error.status);
            this.loggingService.error(`Failed to get inactive tasks: ${error.message}`);  
          }
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
      error: (error) => {
        this.showError(error.status);
        this.loggingService.error(`Failed to delete task with ID ${id}: ${error.message}`);  
      }
    });
  }

  reopenTask(taskID: string){
    this.Taskservice.getSingleTask(taskID).subscribe({
      next: (res: any) => {
        const taskToReopen = {...res.data.document, isActive: true, state: 'In progress'}
        this.Taskservice.updateTask(taskToReopen).subscribe({
          next: (result: any) => {
            this.getTasks();
            setTimeout(() => {
              this.getTasks();
            }, 1000)
          },
          error: (error) => {
            this.showError(error.status);
            this.loggingService.error(`Failed to reopen task with ID ${taskID}: ${error.message}`);  
          }
        })
      },
      error: (err) => {
        this.showError(err.status);
        this.loggingService.error(`Failed to get single task for reopening: ${err.message}`); 
      }
    })
  }

  editTask(id: string) {
    this.Taskservice.getSingleTask(id).subscribe({
      next: (result: any) => {
        this.taskToEdit.set(result.data.document);
        this.taskNameToEdit = this.taskToEdit().taskName;
        //@ts-ignore
        this.expectedHoursToEdit = this.taskToEdit().expectedHours;
        this.visibleEdit = true;
      },
      error: (error) => {
        this.showError(error.status);
        this.loggingService.error(`Failed to get single task for editing: ${error.message}`);  
      }
    })
  }

  onSubmitEditTask() {
    if(this.editTaskForm.valid) {
      const updatedTask = {...this.editTaskForm.value, isActive: true, _id: this.taskToEdit()._id};
      //@ts-ignore
      this.Taskservice.updateTask(updatedTask).subscribe({
        next: (res) => {
          this.getTasks();
          this.visibleEdit = false;
          setTimeout(() => {
            this.getTasks();
          }, 1000);
        },
        error: (error) => {
          this.showError(error.status);
          this.loggingService.error(`Failed to submit edited task: ${error.message}`);  
        }
      })
    } else {
      this.showError(1);
    }
  }

  getSumHours(taskID: string): number {
    let sumFound = this.sumHoursArr.find((el) => {
      if(el.taskID === taskID) return el;
      else return 0;
    })
    return sumFound?.sumHours || 0;  // Restituisce 0 se non trovato
  }
}

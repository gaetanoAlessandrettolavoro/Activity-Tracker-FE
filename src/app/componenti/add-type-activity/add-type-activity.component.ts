import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { AdminserviceService } from '../../servizi/adminservice.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { UserServiceService } from '../../servizi/user-service.service';
import { ErrorServiziService } from '../../servizi/error-servizi.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { LoggingService } from '../../servizi/logging.service';

@Component({
  selector: 'add-type-activity',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    ToastModule,
    InputNumberModule,
  ],
  templateUrl: './add-type-activity.component.html',
  styleUrl: './add-type-activity.component.css',
  providers: [MessageService],
})
export class AddTypeActivityComponent {
  visible: boolean = false;
  taskname: string = '';
  expectedHours: number = 1;
  constructor(
    private addActivity: AdminserviceService,
    private router: Router,
    private userService: UserServiceService,
    private messageService: MessageService,
    private errors: ErrorServiziService,
    private logging: LoggingService
  ) {}

  @Output() added = new EventEmitter<boolean>();

  showError(statusCode: number, newTask: string, errorMessage: string) {
    this.logging.error(`Error occurred creating ${newTask} task.\nError ${statusCode} with message: ${errorMessage}`);
    if(statusCode === 401 || statusCode === 429) {
      this.messageService.add(this.errors.getErrorMessage(statusCode));
      setTimeout(() => {
        this.userService.logout();
        this.router.navigate(['/login']);
      }, 3000);
    } else if(statusCode === 400) {
      this.messageService.add({...this.errors.getErrorMessage(statusCode), detail: 'Il nome che stai provando ad utilizzare è già in uso'});
    } else {
      this.messageService.add(this.errors.getErrorMessage(statusCode));
    }
  }

  submit() {
    const newTask = {
      taskName: this.taskname,
      expectedHours: this.expectedHours,
      isActive: true,
      state: 'To do',
      progressState: 0
    }
    this.addActivity.addTask(newTask).subscribe({
      next: (result: any) => {
        this.visible = false;
        this.taskname = '';
        this.expectedHours = 0;
        this.logging.info(`Created "${newTask.taskName}" task.\nExpected hours: ${newTask.expectedHours}`)
        this.added.emit(true);
      },
      error: (error) => {
        this.showError(error.status, newTask.taskName, error.error.message);
      }
    });
  }

  showDialog() {
    this.visible = true;
  }
}

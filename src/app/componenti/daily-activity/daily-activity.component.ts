import { CommonModule, DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import {
  Component,
  effect,
  signal,
} from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { EditActivityButtonComponent } from '../edit-activity-button/edit-activity-button.component';
import { Activity } from '../../models/activityModel';
import { DeleteActivityButtonComponent } from '../delete-activity-button/delete-activity-button.component';
import { UserTaskCreationComponent } from '../user-task-creation/user-task-creation.component';
import { NoDailyActivityComponent } from '../no-daily-activity/no-daily-activity.component';
import { AdminserviceService } from '../../servizi/adminservice.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { UserServiceService } from '../../servizi/user-service.service';
import { Router } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { ErrorServiziService } from '../../servizi/error-servizi.service';
import { ModalComponent } from '../modal/modal.component';
import { LoggingService } from '../../servizi/logging.service';

@Component({
  selector: 'daily-activity',
  standalone: true,
  imports: [
    TableModule,
    NoDailyActivityComponent,
    CommonModule,
    FooterComponent,
    EditActivityButtonComponent,
    DatePipe,
    DeleteActivityButtonComponent,
    UserTaskCreationComponent,
    ToastModule,
    PaginatorModule,
    ButtonModule,
    ModalComponent
  ],
  templateUrl: './daily-activity.component.html',
  styleUrl: './daily-activity.component.css',
  providers: [MessageService],
})
export class DailyActivityComponent {
  dailyActivity = signal(0);
  oggettistampati!: Activity[];
  nodailyactivity: Boolean = false;
  dailyactivitycomponent: Boolean = false;
  limit : number = 4
  page : number = 1
  first: number = 0;
  totale! : number
  conteggio! : string;
  totalRecords: number = 1;

  constructor(
    private adminService: AdminserviceService, 
    private messageService: MessageService, 
    private userService: UserServiceService, 
    private router: Router, 
    private errors: ErrorServiziService,
    private logging: LoggingService
  ) {
    this.oggettistampati = [];
    this.fetchActivities();
    
    effect(() => {
      if (this.dailyActivity()) {
        this.fetchActivities();
      }
    });
  }

  fetchActivities() {
    this.adminService.getActivitiesByDate({ pageNumber: this.page, limit: this.limit }).subscribe({
      next: (result: any) => {
        console.log(result)
        this.conteggio = result.results + " di " + result.counters.documentsActive;
        this.totalRecords = result.counters.documentsActive;
        if (result.data.userActivities.length === 0) {
          this.nodailyactivity = true;
          this.dailyactivitycomponent = false;
        } else {
          this.nodailyactivity = false;
          this.dailyactivitycomponent = true;
          this.oggettistampati = result.data.userActivities.map((element: any) => ({
            _id: element._id,
            taskName: element.taskName,
            taskID: element.taskID,
            startTime: new Date(element.startTime),
            endTime: new Date(element.endTime),
            notes: element.notes,
            userID: element.userID,
            isActive: element.isActive,
          }));
        }
      },
      error: (err) => {
        let numberValue = parseInt(localStorage.getItem('submit') ?? '0', 10);
        if (numberValue < 4) {
          numberValue++; // Incrementa il contatore di tentativi
          localStorage.setItem('submit', numberValue.toString());
        }
        if (numberValue == 4) {
          setTimeout(() => {
            localStorage.removeItem('submit');
          }, 5000);
        }
        if (numberValue < 4) {
          this.showError(err.status, err.error.message);
        }
      }
    });
  }

  showError(statusCode: number, errorMessage: string) {
    this.logging.error(`Error occurred fetching activities on Date ${new Date()}.\nError ${statusCode} with message ${errorMessage}`)
    if (statusCode === 401 || statusCode === 429) {
      this.messageService.add(this.errors.getErrorMessage(statusCode));
      setTimeout(() => {
        this.userService.logout();
        this.router.navigate(['/login']);
      }, 3000);
    } else {
      this.messageService.add(this.errors.getErrorMessage(statusCode));
    }
  }

  gestiscivalori(event: any) {
    this.dailyActivity.update((c) => c + 1);
  }

  changeLimit() {
    this.fetchActivities();
    if(this.limit > this.totalRecords){
      this.limit = this.totalRecords
    }
  }

  onPageChange(event: any) {
    const pageNumber = event.page + 1;
    this.page = pageNumber;
    this.fetchActivities();
  }

}


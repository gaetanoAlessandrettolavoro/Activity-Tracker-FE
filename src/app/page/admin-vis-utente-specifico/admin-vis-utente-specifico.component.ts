import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule, DatePipe, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditActivityButtonComponent } from '../../componenti/edit-activity-button/edit-activity-button.component';
import { Activity } from '../../models/activityModel';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteActivityButtonComponent } from '../../componenti/delete-activity-button/delete-activity-button.component';
import { MessageService } from 'primeng/api';
import { AdminserviceService } from '../../servizi/adminservice.service';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { UserServiceService } from '../../servizi/user-service.service';
import { ErrorServiziService } from '../../servizi/error-servizi.service';
import { UserTaskCreationComponent } from '../../componenti/user-task-creation/user-task-creation.component';
import { ModalComponent } from "../../componenti/modal/modal.component";
import { LoggingService } from '../../servizi/logging.service';

@Component({
    selector: 'app-admin-vis-utente-specifico',
    standalone: true,
    templateUrl: './admin-vis-utente-specifico.component.html',
    styleUrls: ['./admin-vis-utente-specifico.component.css'],
    imports: [PaginatorModule, TableModule, ButtonModule, CommonModule, FormsModule, EditActivityButtonComponent, NgIf, DatePipe, DeleteActivityButtonComponent, ToastModule, UserTaskCreationComponent, ModalComponent],
    providers: [MessageService]
})
export class AdminVisUtenteSpecificoComponent implements OnInit {
  fromDate: any;
  toDate: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private admin: AdminserviceService,
    private messageService: MessageService,
    private userService: UserServiceService,
    private errors: ErrorServiziService,
    private logging: LoggingService 
  ) {}

  first: number = 0;
  limitDefault = 5;
  limit: number = this.limitDefault;
  pageDefault = 1;
  activities: Activity[] = [];
  idunivoco!: string;
  userEmail: string = ''; 
  conteggio!: any;
  totalRecords: number = 1;

  cols = [
    { field: 'taskName', header: 'Attività' },
    { field: 'activityDate', header: 'Data' },
    { field: 'startTime', header: 'Orario di inizio' },
    { field: 'endTime', header: 'Orario di fine' },
    { field: 'notes', header: 'Note' },
  ];

  showError(statusCode: number) {
    if (statusCode === 401 || statusCode === 429) {
      this.messageService.add(this.errors.getErrorMessage(statusCode));
      setTimeout(() => {
        this.userService.logout();
        this.router.navigate(['/login']);
      }, 3000);
    } else if (statusCode === 400 || statusCode === 404) {      
      this.messageService.add(this.errors.getErrorMessage(statusCode));
      setTimeout(() => {
        this.router.navigate(["**"]);
      }, 1000);
    } else {
      this.messageService.add(this.errors.getErrorMessage(statusCode));
    }
    this.logging.error(`Error occurred with status code: ${statusCode}`);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.idunivoco = id;
      this.fetchActivities(id, this.pageDefault, this.limitDefault);
      this.admin.getOneUser(id).subscribe({
        next: (res) => { this.userEmail = res.data.email; },
        error: (err) => { 
          this.showError(err.status);
          this.logging.error(`Failed to fetch user data with error: ${err.message}`);
        }
      });
    });
  }

  fetchActivities(id: string, page: number, limit: number): void {
    this.activities = []; 
    this.admin.getOneUserActivity(id, page, limit).subscribe({
      next: (result: any) => {
        this.conteggio = result.results + " di " + result.counters.totalDocuments;
        if (result.counters.documentsActive == 0) {
          this.router.navigate(['./dash-admin']);
        }
        this.totalRecords = result.counters.totalDocuments;
        this.activities = result.data.activities.map((element: any) => ({
          taskName: element.taskName,
          startTime: new Date(element.startTime),
          endTime: new Date(element.endTime),
          notes: element.notes,
          taskID: element.taskID,
          _id: element._id,
          isActive: element.isActive
        }));
        this.logging.log('Activities fetched successfully');
      },
      error: (err) => {
        this.showError(err.status);
        this.logging.error(`Failed to fetch activities with error: ${err.message}`);
      }
    });
  }

  onPageChange(event: any): void {
    const pageNumber = (event.page + 1);
    this.pageDefault = pageNumber;
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (this.limit == undefined) {
        this.fetchActivities(id, pageNumber, this.limitDefault);
      } else {
        this.fetchActivities(id, pageNumber, this.limit);
      }
    });
    this.logging.log(`Page changed to: ${this.pageDefault}`);
  }

  changeLimit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (this.limit == undefined) {
        this.fetchActivities(id, this.pageDefault, this.limitDefault);
      } else {
        if (this.limit > this.totalRecords) {
          this.limit = this.totalRecords;
        } else {
          this.fetchActivities(id, this.pageDefault, this.limit);
        }
      }
    });
    this.logging.log(`Limit changed to: ${this.limit}`);
  }

  onEditActivity() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.idunivoco = id;
      this.fetchActivities(id, this.pageDefault, this.limitDefault);
      this.admin.getOneUser(id).subscribe({
        next: (res) => { this.userEmail = res.data.email; },
        error: (err) => {
          this.showError(err.status);
          this.logging.error(`Failed to edit activity with error: ${err.message}`);
        }
      });
    });
    this.logging.log('Edit activity triggered');
  }

  onDeleteActivity() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.idunivoco = id;
      this.fetchActivities(id, this.pageDefault, this.limitDefault);
    });
    this.admin.getOneUser(this.idunivoco).subscribe({
      next: (res) => { this.userEmail = res.data.email; },
      error: (err) => {
        this.showError(err.status);
        this.logging.error(`Failed to delete activity with error: ${err.message}`);
      }
    });
    this.logging.log('Delete activity triggered');
  }

  applyFilter(): void {
    this.admin.filterActivitiesByDate(this.idunivoco, this.fromDate, this.toDate, this.pageDefault, this.limitDefault).subscribe({
      next: (result: any) => {
        this.conteggio = result.results + " di " + result.counters.totalDocuments;
        this.totalRecords = result.counters.totalDocuments;
        this.activities = result.data.activities.map((element: any) => ({
          taskName: element.taskName,
          startTime: new Date(element.startTime),
          endTime: new Date(element.endTime),
          notes: element.notes,
          taskID: element.taskID,
          _id: element._id,
          isActive: element.isActive
        }));
        this.logging.log('Activities filtered by date successfully');
      },
      error: (err: any) => {
        this.showError(err.status);
        this.logging.error(`Failed to filter activities with error: ${err.message}`);
      }
    });
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EditActivityButtonComponent } from '../../../componenti/edit-activity-button/edit-activity-button.component';
import { FooterComponent } from '../../../componenti/footer/footer.component';
import { FilterService, MessageService } from 'primeng/api';
import { Activity } from '../../../models/activityModel';
import { DeleteActivityButtonComponent } from '../../../componenti/delete-activity-button/delete-activity-button.component';
import { ActivitiesServicesService } from '../../../servizi/activities-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { UserServiceService } from '../../../servizi/user-service.service';
import { ErrorServiziService } from '../../../servizi/error-servizi.service';
import { ModalComponent } from '../../../componenti/modal/modal.component';
import { LoggingService } from '../../../servizi/logging.service';
import *as Papa from 'papaparse';
@Component({
  selector: 'app-attivita-recenti-utente',
  standalone: true,
  templateUrl: './attivita-recenti-utente.component.html',
  styleUrls: ['./attivita-recenti-utente.component.css'],
  imports: [
    TableModule,
    ButtonModule,
    CommonModule,
    ReactiveFormsModule,
    EditActivityButtonComponent,
    FooterComponent,
    DeleteActivityButtonComponent,
    PaginatorModule,
    ToastModule,
    ModalComponent
  ],
  providers: [MessageService],
})
export class AttivitaRecentiUtenteComponent implements OnInit {

  rowItems: Activity[] = [];
  filteredItems: Activity[] = [];
  filterForm: FormGroup;
  startTime!: string;
  endTime!: string;

  router = inject(Router);

  cols = [
    { field: 'taskName', header: 'Attività' },
    { field: 'startTime', header: 'Data' },
    { field: 'startTime', header: 'Orario di inizio' },
    { field: 'endTime', header: 'Orario di fine' },
    { field: 'notes', header: 'Note' },
  ];

  limitDefault = 5;
  limit: number = this.limitDefault;
  first: number = 0;
  pageDefault = 1;
  conteggio!: string;
  totalRecords: number = 1;

  constructor(
    private filterService: FilterService,
    private activitiesservices: ActivitiesServicesService,
    private route: ActivatedRoute,
    private userService: UserServiceService,
    private messageService: MessageService,
    private errors: ErrorServiziService,
    private logging: LoggingService
  ) {
    this.filterForm = new FormGroup({
      taskName: new FormControl(''),
      fromDate: new FormControl(''),
      toDate: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.loadActivities(this.pageDefault, this.limitDefault);

    this.filterForm.valueChanges.subscribe(() => {
      this.pageDefault = 1;
      this.filterActivities();
    });
    this.logging.log('Component initialized and activities loaded');
  }

  showError(statusCode: number) {
    if (statusCode === 401 || statusCode === 429) {
      this.messageService.add(this.errors.getErrorMessage(statusCode));
      setTimeout(() => {
        this.userService.logout();
        this.router.navigate(['/login']);
      }, 3000);
    } else {
      this.messageService.add(this.errors.getErrorMessage(statusCode));
    }
    this.logging.error(`Error occurred with status code: ${statusCode}`);
  }

  loadActivities(pageNumber: number, limit: number): void {
    const { taskName, fromDate, toDate } = this.filterForm.value;

    this.activitiesservices.getActivities({ pageNumber, limit, fromDate, toDate, taskName }).subscribe({
      next: (data) => {
        this.conteggio = `${data.results} di ${data.counters.documentsActive}`;
        this.totalRecords = data.counters.documentsActive;
        this.rowItems = data.data.userActivities.map((item: Activity) => ({
          taskID: item.taskID,
          taskName: item.taskName,
          startTime: new Date(item.startTime),
          endTime: new Date(item.endTime),
          notes: item.notes,
          _id: item._id,
          isTaskActive: item.isTaskActive
        }));
        this.filteredItems = this.rowItems;
        this.logging.log('Activities loaded successfully');
      },
      error: (err) => {
        this.showError(err.status);
        this.logging.error(`Failed to load activities with error: ${err.message}`);
      }
    });
  }

  filterActivities(): void {
    this.loadActivities(this.pageDefault, this.limit);
    this.logging.log('Activities filtered');
  }

  refresh() {
    this.loadActivities(this.pageDefault, this.limit);
    this.logging.log('Activities refreshed');
  }

  onPageChange(event: any): void {
    const pageNumber = event.page + 1;
    this.pageDefault = pageNumber;
    this.loadActivities(pageNumber, this.limit);
    this.logging.log(`Page changed to: ${pageNumber}`);
  }

  changeLimit(): void {
    this.loadActivities(this.pageDefault, this.limit);
    this.logging.log(`Limit changed to: ${this.limit}`);
  }

  exportToCsv(): void {
    console.log('Exporting', this.rowItems);
    const csv = Papa.unparse(this.rowItems.map(item => ({
      Attività: item.taskName,
      Data:item.startTime,
      OrarioInizio: item.startTime,
      OrarioFine: item.endTime, 
      Note:item.notes,
    })));

    
    const blob = new Blob ([csv], {type: 'text/csv;charset=utf-8;'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href =url;
    a.download= 'report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}

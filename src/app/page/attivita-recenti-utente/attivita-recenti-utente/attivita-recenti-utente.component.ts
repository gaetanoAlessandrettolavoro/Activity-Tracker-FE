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
  ],
  providers: [MessageService],
})
export class AttivitaRecentiUtenteComponent implements OnInit {


  

  rowItems: Activity[] = [];
  filteredItems: Activity[] = [];
  filterForm: FormGroup;
  start! : any
  end! : any

  router = inject(Router);

  cols = [
    { field: 'taskName', header: 'Attività' },
    { field: 'activityDate', header: 'Data' },
    { field: 'startTime', header: 'Orario di inizio' },
    { field: 'endTime', header: 'Orario di fine' },
    { field: 'notes', header: 'Note' },
  ];
  
  limitDefault = 5;
  limit: number = this.limitDefault; // Initialize limit with default value
  first: number = 0;
  rows: number = 10;
  pageDefault = 1;
  conteggio! : any

  constructor(
    private filterService: FilterService,
    private activitiesservices: ActivitiesServicesService,
    private route: ActivatedRoute,
    private userService: UserServiceService,
    private messageService: MessageService,
  ) {
    this.filterForm = new FormGroup({
      searchText: new FormControl(''),
      fromDate: new FormControl(''),
      endTime: new FormControl(''),
    });
  }

  startTime() {
    this.start = this.filterForm.value.fromDate
    console.log('Start Date:', this.start);
    this.loadActivities(this.pageDefault, this.limitDefault);
  }

  endTime() {
    this.end = this.filterForm.value.endTime
    console.log('End Date:', this.end);
    this.loadActivities(this.pageDefault,this.limitDefault,this.start,this.end)
  }


  show(statusCode: number) {
    if (statusCode === 401) {
      this.messageService.add({
        severity: 'error',
        summary: 'Errore 401',
        detail: 'Sembra che tu non sia autenticato. Accedi per continuare.',
      });
      setTimeout(() => {
        this.userService.logout();
        this.router.navigate(['/login']);
      }, 3000);
    }
    if (statusCode === 500) {
      this.messageService.add({
        severity: 'error',
        summary: 'Errore 500',
        detail: 'Errore interno del server, riprova più tardi.',
      });
    }
  }

  isDateInRange(date: Date, fromDate: string, toDate: string): boolean {
    const activityDate = new Date(date);

    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    if (from) {
      from.setHours(0, 0, 0, 0);
    }
    if (to) {
      to.setHours(23, 59, 59, 999);
    }

    if (from && to) {
      return activityDate >= from && activityDate <= to;
    } else if (from) {
      return activityDate >= from;
    } else if (to) {
      return activityDate <= to;
    } else {
      return true;
    }
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  filterActivities() {
    const { searchText, fromDate, toDate } = this.filterForm.value;
    console.log('Search Text:', searchText);
    this.filteredItems = this.rowItems.filter((item) => {
      const matchesText =
        !searchText ||
        item.taskName.toLowerCase().includes(searchText.toLowerCase());
      const itemDate = new Date(item.startTime);
      const date = this.formatDate(itemDate);
      const matchesDate =
        !fromDate && !toDate
          ? true
          : this.isDateInRange(item.startTime, fromDate, toDate);
      return matchesText && matchesDate;
    });
  }

  ngOnInit(): void {
    this.loadActivities(this.pageDefault, this.limitDefault);

    this.filterForm.valueChanges.subscribe({
      next: () => {
        this.filterActivities();
      },
      error: (err) => {
        this.show(err.status);
      }
    });
  }

  loadActivities(pageNumber: number, limit: number, fromDate?: string, toDate?: string): void {
    console.log('Loading Activities. Page:', pageNumber, 'Limit:', limit, 'From Date:', fromDate, 'To Date:', toDate);
    this.activitiesservices.getActivities({ pageNumber, limit, fromDate: this.start, toDate: this.end }).subscribe((data) => {
      this.conteggio = data.results + " di " + data.totalDocuments
      this.rowItems = data.data.userActivities.map((item: Activity) => ({
        taskID: item.taskID,
        taskName: item.taskName,
        startTime: new Date(item.startTime),
        endTime: new Date(item.endTime),
        notes: item.notes,
        _id: item._id,
      }));
      this.filteredItems = [...this.rowItems];
      this.filterActivities(); 
    });
  }

  reload() {
    window.location.reload();
  }

  onPageChange(event: any): void {
    const pageNumber = event.page + 1;
    console.log('Page Change. New Page Number:', pageNumber);
    this.pageDefault = pageNumber;
    this.loadActivities(pageNumber, this.limit, this.filterForm.value.fromDate, this.filterForm.value.toDate); // Use the current limit value and date filters
  }

  changeLimit(): void {
    console.log('Limit Change. New Limit:', this.limit);
    this.loadActivities(this.pageDefault, this.limit, this.filterForm.value.fromDate, this.filterForm.value.toDate);
  }
}


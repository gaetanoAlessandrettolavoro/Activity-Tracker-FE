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

  router = inject(Router);

  cols = [
    { field: 'taskName', header: 'Attività' },
    { field: 'activityDate', header: 'Data' },
    { field: 'startTime', header: 'Orario di inizio' },
    { field: 'endTime', header: 'Orario di fine' },
    { field: 'notes', header: 'Note' },
  ];
  limitDefault = 5
  limit: number = this.limitDefault; // Initialize limit with default value
  first: number = 0;
  rows: number = 10;
  pageDefault = 1

  constructor(
    private filterService: FilterService,
    private activitiesservices: ActivitiesServicesService,
    private userService: UserServiceService,
    private messageService: MessageService,
    private errors: ErrorServiziService
  ) {
    this.filterForm = new FormGroup({
      searchText: new FormControl(''),
      fromDate: new FormControl(''),
      toDate: new FormControl(''),
    });
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
        this.showError(err.status);
      }
    });
  }
  
  loadActivities(pageNumber: number, limit: number): void {
    this.activitiesservices.getActivities({ pageNumber, limit }).subscribe({
      next: (data) => {
        this.rowItems = data.data.userActivities.map((item: Activity) => ({
          taskID: item.taskID,
          taskName: item.taskName,
          startTime: new Date(item.startTime),
          endTime: new Date(item.endTime),
          notes: item.notes,
          _id: item._id,
        }));
        this.filteredItems = [...this.rowItems];
      },
      error: (error) => {
        this.showError(error.status)
      }
  });

    this.filterForm.valueChanges.subscribe({
      next: () => {
        this.filterActivities();
      },
      error: (err) => {
        this.showError(err.status);
      }
    });
  }


  reload() {
    window.location.reload();
  }

  onPageChange(event: any): void {
    const pageNumber = event.page + 1;
    this.pageDefault = pageNumber;
    this.loadActivities(pageNumber, this.limit); // Use the current limit value
  }

  changeLimit(): void {
    this.loadActivities(this.pageDefault, this.limit);
  }
}

import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe, NgIf } from '@angular/common';
import { TableModule } from 'primeng/table';
import { EditActivityButtonComponent } from '../../componenti/edit-activity-button/edit-activity-button.component';
import { ButtonModule } from 'primeng/button';
import { Activity } from '../../models/activityModel';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterService, MessageService } from 'primeng/api';
import { FooterComponent } from '../../componenti/footer/footer.component';
import { DeleteActivityButtonComponent } from '../../componenti/delete-activity-button/delete-activity-button.component';
import { catchError, of } from 'rxjs';
import { PaginatorModule } from 'primeng/paginator';
import { AdminserviceService } from '../../servizi/adminservice.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { UserServiceService } from '../../servizi/user-service.service';
import { ErrorServiziService } from '../../servizi/error-servizi.service';
import { ModalComponent } from '../../componenti/modal/modal.component';
import { LoggingService } from '../../servizi/logging.service';
import * as Papa from 'papaparse';
import { ExcelService } from '../../excel.service';


interface rowItem extends Activity {
  activityDate: string | number | Date;
  cognome: string;
  nome: string;
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'tutte-attivita',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    EditActivityButtonComponent,
    ButtonModule,
    RippleModule,
    InputTextModule,
    FormsModule,
    FooterComponent,
    DeleteActivityButtonComponent,
    DatePipe,
    PaginatorModule,
    ReactiveFormsModule,
    ToastModule,
    NgIf,
    ModalComponent
  ],
  templateUrl: './tutte-attivita.component.html',
  styleUrls: ['./tutte-attivita.component.css'],
  providers: [MessageService, DatePipe,ExcelService],
})
export class TutteAttivitaComponent implements OnInit {
  originalRowItems: rowItem[] = [];
  rowItems: rowItem[] = [];
  filteredItems: Activity[] = [];
  filterForm!: FormGroup;

  textFilter = signal<string>('');
  isFiltered = signal<boolean>(false);
  totalRecords: number = 1;
  loading: boolean = false;
  limitDefault = 4;
  limit: number = this.limitDefault;
  usersArray: any[] = [];
  first: number = 0;
  rows: number = 10;
  conteggio!: any;
  soloattivivariabile = false;
  page!: any;
  states: any[] = [];
  selectedState: any;

  cols = [
    { field: 'firstName', header: 'Nome' },
    { field: 'lastName', header: 'Cognome' },
    { field: 'taskName', header: 'Attività' },
    { field: 'isTaskActive', header: 'Stato Attività' },
    { field: 'activityDate', header: 'Data' },
    { field: 'startTime', header: 'Orario di inizio' },
    { field: 'endTime', header: 'Orario di fine' },
    { field: 'notes', header: 'Note' },
    { field: '', header: '' }
  ];

  tempLimit: number = this.limitDefault; 

  constructor(
    private filterService: FilterService,
    private userServ: AdminserviceService,
    private messageService: MessageService,
    private router: Router,
    private userService: UserServiceService,
    private errors: ErrorServiziService,
    private datePipe: DatePipe,
    private loggingService: LoggingService,
    private excel:ExcelService
  ) {}

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
    this.loggingService.error(`Error ${statusCode}`);
  }

  soloattivi(page?: number, limit: number = this.limitDefault, taskName?: string, fromDate?: string, toDate?: string) {
    this.soloattivivariabile = true;
    this.getActivities(page, limit, taskName, fromDate, toDate, true);
  }

  onStateChange(event: any) {
    if (event.value.name === 'Solo attivi') {
      this.soloattivi();
    } else {
      this.getActivities(1, this.limit);
    }
  }

  findUser(id: string): Promise<any> {
    return this.userServ
      .getOneUser(id)
      .pipe(
        catchError((err) => {
          this.showError(err.status);
          return of(null); 
        })
      )
      .toPromise();
  }

  async getActivities(page?: number, limit: number = this.limitDefault, taskName?: string, fromDate?: string, toDate?: string, active?: boolean) {
    if (!page) {
      page = 1;
    }
    
    const formattedFromDate = fromDate ? this.datePipe.transform(fromDate, 'yyyy-MM-dd') || '' : '';
    const formattedToDate = toDate ? this.datePipe.transform(toDate, 'yyyy-MM-dd') || '' : '';

    this.userServ
      .getAllUsersActivities(page, limit, active, taskName, formattedFromDate, formattedToDate)
      .pipe(
        catchError((err) => {
          this.showError(err.status);
          return of({ data: { document: [] } });
        })
      )
      .subscribe(async (result: any) => {
        const newRows: rowItem[] = [];
        console.log(result);
        for (let activity of result.data.document) {
          let foundUser = await this.findUser(activity.userID);
          if (foundUser) {
            newRows.push({
              ...activity,
              cognome: foundUser.data.lastName,
              nome: foundUser.data.firstName,
              firstName: foundUser.data.firstName,
              lastName: foundUser.data.lastName,
              isTaskActive: activity.isTaskActive
            });
          }
        }
        this.originalRowItems = newRows;
        this.rowItems = newRows;
        this.filteredItems = [...this.rowItems];

        if (formattedFromDate || formattedToDate) {
          this.rowItems = this.rowItems.filter(item =>
            this.isDateInRange(new Date(item.activityDate), formattedFromDate, formattedToDate)
          );
        }

        this.totalRecords = result.counters.totalResultQueriesActive; 
        this.first = (page - 1) * limit;
        this.rows = limit; 
      });
  }

  isDateInRange(date: Date, fromDate?: string, toDate?: string): boolean {
    const activityDate = new Date(date);
    
    let from = fromDate ? new Date(fromDate) : null;
    let to = toDate ? new Date(toDate) : null;
    
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

  async ngOnInit() {
    this.filterForm = new FormGroup({
      taskName: new FormControl(''),
      fromDate: new FormControl(''),
      toDate: new FormControl('')
    });

    

    this.filterForm.valueChanges.subscribe(() => {
      this.filterActivities();
    });

    this.states = [
      { name: 'Tutti', code: 'NY' },
      { name: 'Solo attivi', code: 'RM' },
    ];

    this.rows = this.limit; 
    this.first = 0; 
    await this.getActivities(1, this.limit);
  }

  filterActivities() {
    const { taskName, fromDate, toDate } = this.filterForm.value;
    this.getActivities(1, this.limit, taskName, fromDate, toDate);
    console.log(this.filterForm.value);
  }

  activityToSend(activity: rowItem): Activity {
    return {
      _id: activity._id,
      userID: activity.userID,
      taskID: activity.taskID,
      taskName: activity.taskName,
      startTime: new Date(activity.startTime),
      endTime: new Date(activity.endTime),
      notes: activity.notes,
      isTaskActive: activity.isTaskActive
    };
  }

  changeLimit() {
    this.limit = this.tempLimit;
    if (this.limit > this.totalRecords) {
      this.limit = this.totalRecords;
      this.tempLimit = this.limit;
    }
    if (this.soloattivivariabile) {
      this.soloattivi(this.page, this.limit);
    } else {
      this.getActivities(this.page, this.limit);
    }
  }

  onPageChange(event: any) {
    const pageNumber = event.page + 1;
    this.page = pageNumber;
    const { taskName, fromDate, toDate } = this.filterForm.value;
    if (this.soloattivivariabile) {
      this.soloattivi(pageNumber, this.limit, taskName, fromDate, toDate);
    } else {
      this.getActivities(pageNumber, this.limit, taskName, fromDate, toDate);
    }
  }

  onClickSetFilter() {
    this.filterActivities();
  }

  onClickRemoveFilter() {
    this.filterForm.reset();
    this.getActivities(1, this.limit);
  }

  reload() {
    this.filterActivities();
  }

  exportToCSV(): void {
    console.log('Exporting data:', this.originalRowItems);
    const csv = Papa.unparse(this.originalRowItems.map(item => ({
      Nome: item.firstName,
      Cognome: item.lastName,
      Attività: item.taskName,
      'Stato Attività': item.isTaskActive ? 'Attivo' : 'Non Attivo' ,
      Data: this.datePipe.transform(item.startTime, 'dd/MM/yyyy'),
      'Orario di inizio': this.datePipe.transform(item.startTime, 'HH:mm'),
      'Orario di fine': this.datePipe.transform(item.endTime, 'HH:mm'),
      Note: item.notes,
    })));
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  exportToExcel(): void {
    console.log('Exporting to Excel');
    const data = this.rowItems.map(item => ({
      Nome: item.firstName,
      Cognome: item.lastName,
      Attività: item.taskName,
      'Stato Attività': item.isTaskActive ? 'Attivo' : 'Non Attivo' ,
      Data: this.datePipe.transform(item.startTime, 'dd/MM/yyyy'),
      'Orario di inizio': this.datePipe.transform(item.startTime, 'HH:mm'),
      'Orario di fine': this.datePipe.transform(item.endTime, 'HH:mm'),
      Note: item.notes,
      
    }));
    this.excel.generateExcel(data, 'user_data');
  }
  

  
}
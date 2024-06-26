import { CommonModule, DatePipe, NgIf } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { EditActivityButtonComponent } from '../../componenti/edit-activity-button/edit-activity-button.component';
import { ButtonModule } from 'primeng/button';
import { Activity } from '../../models/activityModel';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FilterService, MessageService } from 'primeng/api';
import { FooterComponent } from '../../componenti/footer/footer.component';
import { DeleteActivityButtonComponent } from '../../componenti/delete-activity-button/delete-activity-button.component';
import { catchError, of } from 'rxjs';
import { PaginatorModule } from 'primeng/paginator';
import { AdminserviceService } from '../../servizi/adminservice.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { UserServiceService } from '../../servizi/user-service.service';
import { ErrorServiziService } from '../../servizi/error-servizi.service';
import { PrimeIcons } from 'primeng/api';
import { SortEvent } from 'primeng/api';



interface rowItem extends Activity {
  cognome: string;
  nome: string;
  firstName:string;
  lastName:string;
  
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
    NgIf
  ],
  templateUrl: './tutte-attivita.component.html',
  styleUrls: ['./tutte-attivita.component.css'],
  providers: [MessageService],
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
  conteggio! : any

  cols = [
    { fields: 'firstName', header:'Nome'},
    { fields: 'lastName', header:'Cognome'},
    { field: 'taskName', header: 'Attività' },
    { field: 'activityDate', header: 'Data' },
    { field: 'startTime', header: 'Orario di inizio' },
    { field: 'endTime', header: 'Orario di fine' },
    { field: 'notes', header: 'Note' },
  ];

  tempLimit: number = this.limitDefault; // Aggiungi una variabile temporanea

  constructor(
    private filterService: FilterService,
    private userServ: AdminserviceService,
    private messageService: MessageService,
    private router: Router,
    private userService: UserServiceService,
    private errors: ErrorServiziService
  ) {}

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


  findUser(id: string): Promise<any> {
    return this.userServ
      .getOneUser(id)
      .pipe(
        catchError((err) => {
          this.showError(err.status);
          return of(null); // Restituisci null in caso di errore
        })
      )
      .toPromise();
  }

  async getActivities(page?: number, limit: number = this.limitDefault) {
    if (!page) {
      page = 1;
    }
    this.userServ
      .getAllUsersActivities(page, limit)
      .pipe(
        catchError((err) => {
          this.showError(err.status);
          return of({ data: { document: [] } });
        })
      )
      .subscribe(async (result: any) => {
        const newRows: rowItem[] = [];
        for (let activity of result.data.document) {
          this.conteggio = result.results + " di " + result.counters.totalDocuments
          let foundUser = await this.findUser(activity.userID);
          if (foundUser) {
            newRows.push({
              ...activity,
              cognome: foundUser.data.lastName,  // Assegna lastName a cognome
              nome: foundUser.data.firstName,   // Assegna firstName a nome
              firstName: foundUser.data.firstName,  // Nuovo campo firstName
              lastName: foundUser.data.lastName,    // Nuovo campo lastName
            });
          }
        }
  
        this.originalRowItems = newRows;
        this.rowItems = newRows;
        this.filteredItems = [...this.rowItems];
        this.totalRecords = result.counters.totalDocuments;
      });
  }
  
  async ngOnInit() {
    // Inizializza il FormGroup con i campi di filtro
    this.filterForm = new FormGroup({
      searchText: new FormControl(''),
      fromDate: new FormControl(''),
      toDate: new FormControl('')
    });
  
    // Aggiungi un listener per le modifiche nel FormGroup
    this.filterForm.valueChanges.subscribe(() => {
      this.filterActivities();
    });
  
    // Carica le attività
    await this.getActivities(1, this.limit);
  }
  
  filterActivities() {
    const { searchText, fromDate, toDate } = this.filterForm.value;
    this.filteredItems = this.rowItems.filter((item) => {
      const matchesText =
        !searchText ||
        item.taskName.toLowerCase().includes(searchText.toLowerCase()) ||
        item.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
        item.lastName.toLowerCase().includes(searchText.toLowerCase());
  
      const itemDate = new Date(item.startTime);
      const matchesDate = this.isDateInRange(itemDate, fromDate, toDate);
  
      return matchesText && matchesDate;
    });
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
  
  activityToSend(activity: rowItem): Activity  {
    return {
      _id: activity._id,
      userID: activity.userID,
      taskID: activity.taskID,
      taskName: activity.taskName,
      startTime: new Date(activity.startTime),
      endTime: new Date(activity.endTime),
      notes: activity.notes,
      
    };
  }

  changeLimit() {
    this.limit = this.tempLimit; // Aggiorna il limite con il valore temporaneo
    this.getActivities(1, this.limit);
  }

  onPageChange(event: any) {
    const pageNumber = event.page + 1;
    this.getActivities(pageNumber, this.limit);
  }

  onClickSetFilter() {
    this.filterActivities();
  }

  onClickRemoveFilter() {
    this.filterForm.reset();
    this.rowItems = [...this.originalRowItems];
    this.filteredItems = [...this.originalRowItems]; 
    console.log('Filter removed, items restored:', this.filteredItems); 
  }

  reload() {
    window.location.reload();
  }


  
  
  
}

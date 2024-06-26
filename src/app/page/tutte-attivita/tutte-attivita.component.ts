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


interface rowItem extends Activity {
  cognome: string;
  nome: string;
  user: {
    codiceFiscale: string;
    firstName: string;
    lastName: string;
    propic: string;
  };
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
  totalRecords!: number;
  loading: boolean = false;
  limitDefault = 4;
  limit: number = this.limitDefault;
  usersArray: any[] = [];
  first: number = 0;
  rows: number = 10;

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
          return of({ data: { document: [] } }); // Restituisci un array vuoto in caso di errore
        })
      )
      .subscribe(async (result: any) => {
        const newRows: rowItem[] = [];
        for (let activity of result.data.document) {
            let foundUser = await this.findUser(activity.userID);
            if (foundUser) {
              newRows.push({
                ...activity,
                user: {
                  codiceFiscale: foundUser.data.codiceFiscale,
                  firstName: foundUser.data.firstName,
                  lastName: foundUser.data.lastName,
                  propic: foundUser.data.propic,
                },
              });
          }
        }

        this.originalRowItems = newRows;
        this.rowItems = newRows;
        this.filteredItems = [...this.rowItems]; // Inizializza filteredItems con tutte le attività
        //@ts-ignore
        this.totalRecords = result.totalDocuments;
      });
  }

  async ngOnInit() {
    this.filterForm = new FormGroup({
      searchText: new FormControl('')
    });

    // Aggiungi questo qui
    this.filterForm.valueChanges.subscribe(() => {
      this.filterActivities();
    });
  
    // Carica le attività
    await this.getActivities(1, this.limit);
  }

  loadActivities(event: TableLazyLoadEvent) {
    this.loading = true;

    setTimeout(() => {
      if (event?.first === 0) {
        this.getActivities(1, this.limit);
      } else if (event?.first !== undefined) {
        const rows = event?.rows ?? this.limit;
        const page = Math.floor(event.first / rows) + 1;
        this.getActivities(page, rows);
      }
      this.loading = false;
    }, 500);
  }

  filterActivities() {
    const { searchText } = this.filterForm.value;
  
    if (!searchText) {
      // se il campo di ricerca è vuoto, ripristina tutte le attività
      this.filteredItems = [...this.rowItems];
    } else {
      // fifiltra le attività in base al testo di ricerca
      this.filteredItems = this.rowItems.filter((item) => {
        const matchesText =
          item.taskName.toLowerCase().includes(searchText.toLowerCase()) ||
          item.user.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
          item.user.lastName.toLowerCase().includes(searchText.toLowerCase());
        return matchesText;
      });
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
      isActive: activity.isActive,
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
  
  
}

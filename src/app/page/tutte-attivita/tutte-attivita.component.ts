import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RowToggler, TableLazyLoadEvent, TableModule } from 'primeng/table';
import { EditActivityButtonComponent } from '../../componenti/edit-activity-button/edit-activity-button.component';
import { ButtonModule } from 'primeng/button';
import { Activity } from '../../models/activityModel';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FilterService } from 'primeng/api';
import { AdminVisTutteAttUsersComponent } from '../../componenti/admin-vis-tutte-att-users/admin-vis-tutte-att-users.component';
import { FooterComponent } from '../../componenti/footer/footer.component';
import { DeleteActivityButtonComponent } from '../../componenti/delete-activity-button/delete-activity-button.component';
import { catchError, of } from 'rxjs';
import { PaginatorModule } from 'primeng/paginator';
import { AdminserviceService } from '../../servizi/adminservice.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';


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
    AdminVisTutteAttUsersComponent,
    FooterComponent,
    DeleteActivityButtonComponent,
    DatePipe,
    PaginatorModule,
    ReactiveFormsModule
  ],
  templateUrl: './tutte-attivita.component.html',
  styleUrl: './tutte-attivita.component.css',
  providers: [RowToggler],
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

  constructor(
    private filterService: FilterService,
    private userServ: AdminserviceService,
    private cdr: ChangeDetectorRef,
  ) {}

  findUser(id: string): Promise<any> {
    return this.userServ
      .getOneUser(id)
      .pipe(
        catchError((err) => {
          console.error(
            "Si è verificato un errore durante la ricerca dell'utente:",
            err,
          );
          return of(null); // Restituisci null in caso di errore
        }),
      )
      .toPromise();
  }

  async getActivities(page?: number, limit: number = 7) {
    if (!page) {
      page = 1;
    }
    this.userServ
      .getAllUsersActivities(page, limit)
      .pipe(
        catchError((err) => {
          console.error(
            'Si è verificato un errore durante il recupero delle attività:',
            err,
          );
          return of({ data: { document: [] } }); // Restituisci un array vuoto in caso di errore
        }),
      )
      .subscribe(async (result:any) => {
        const newRows: rowItem[] = [];
        for (let activity of result.data.document) {
          if (activity.isActive) {
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
        }
        console.log('New Rows:', newRows); // Log per vedere i nuovi elementi
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
    await this.getActivities(1);
  }

  loadActivities(event: TableLazyLoadEvent) {
    this.loading = true;

    setTimeout(() => {
      if(event?.first === 0){
        this.getActivities(1);
      }
      if(event?.first && event?.rows){
        this.getActivities((event?.first + event?.rows)/7)
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
  
  activityToSend(activity: rowItem): Activity {
    return {
      _id: activity._id,
      userID: activity.userID,
      taskID: activity.taskID,
      taskName: activity.taskName,
      startTime: new Date(activity.startTime),
      endTime: new Date(activity.endTime),
      notes: activity.notes,
      isActive: activity.isActive,
    }
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

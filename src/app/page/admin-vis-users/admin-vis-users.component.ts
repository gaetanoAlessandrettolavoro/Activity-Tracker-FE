import { Component, OnInit, DoCheck, ChangeDetectorRef, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import * as Papa from 'papaparse';
import { AdminserviceService } from '../../servizi/adminservice.service';
import { UserServiceService } from '../../servizi/user-service.service';
import { ErrorServiziService } from '../../servizi/error-servizi.service';
import { LoggingService } from '../../servizi/logging.service';
import { User } from '../../models/userModel';
import { AdminatoacceptusersComponent } from '../../componenti/adminatoacceptusers/adminatoacceptusers.component';
import { DeleteUserButtonComponent } from '../../componenti/delete-user-button/delete-user-button.component';
import { UserTaskCreationComponent } from '../../componenti/user-task-creation/user-task-creation.component';
import { ExcelService } from '../../excel.service';

@Component({
  selector: 'app-admin-vis-user',
  standalone: true,
  templateUrl: './admin-vis-users.component.html',
  styleUrls: ['./admin-vis-users.component.css'],
  imports: [
    TableModule,
    ButtonModule,
    CommonModule,
    PaginatorModule,
    InputTextModule,
    FormsModule,
    DialogModule,
    ToastModule,
    AdminatoacceptusersComponent,
    DeleteUserButtonComponent,
    UserTaskCreationComponent,
    ReactiveFormsModule
  ],
  providers: [MessageService,ExcelService],
})
export class AdminvisuserComponent implements OnInit, DoCheck {
  totalRecords = signal<number>(1); // Transform totalRecords to a signal
  searchQuery = new FormGroup({
    searchQuery: new FormControl('')
  });
  Ciao: number = 0;

  constructor(
    private users: AdminserviceService,
    private router: Router,
    private messageService: MessageService,
    private userService: UserServiceService,
    private errors: ErrorServiziService,
    private cdref: ChangeDetectorRef,
    private logging: LoggingService,
    private excelService: ExcelService  // Injecting the ExcelService
  ) {}

  usersArray = signal<User[]>([]);
  userActivities: any[] = [];
  modaldmin: boolean = false;

  cols = [
    { field: 'firstName', header: 'Nome' },
    { field: 'lastName', header: 'Cognome' },
    { field: 'codiceFiscale', header: 'Codice Fiscale' },
    { field: 'email', header: 'Email' },
  ];

  filteredUsers: User[] = [];
  searchFirstName: string = '';
  searchLastName: string = '';
  searchText: string = '';
  fromDate: string = '';
  toDate: string = '';

  visible: boolean = false;
  visibleNoActivity: boolean = false;

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

  showDialog() {
    this.visible = true;
    this.logging.log('Dialog shown');
  }

  limitDefault = 5;
  limit: number = this.limitDefault;
  first: number = 0;
  rows: number = 10;
  pageDefault = 1;
  conteggio!: any;

  changemodaladmin() {
    this.modaldmin = !this.modaldmin;
    console.log(this.modaldmin);
    this.logging.log(`admin modal changed to: ${this.modaldmin}`);
  }

  filterUsers() {
    if (this.searchQuery.value.searchQuery !== '') {
      this.users.getUsers().subscribe({
        next: (result) => {
          const newUsers = result.data.document.filter((user: any) => {
            //@ts-ignore
            return user.firstName.toLowerCase().includes(this.searchQuery.value.searchQuery.toLowerCase()) ||
              //@ts-ignore
            user.lastName.toLowerCase().includes(this.searchQuery.value.searchQuery.toLowerCase());
          });
          this.filteredUsers = newUsers;
          this.totalRecords.set(newUsers.length); // Use the signal setter
          console.log('Filtered Total Records:', this.totalRecords()); // Debugging
          this.conteggio = `${this.totalRecords()} di ${this.totalRecords()}`;
        },
        error: (error) => this.showError(error.status)
      });
    } else {
      this.filteredUsers = this.usersArray().filter((user) => {
        const matchesFirstName = !this.searchQuery || //@ts-ignore
          user.firstName.toLowerCase().includes(this.searchQuery.value.searchQuery.toLowerCase());

        const matchesLastName = !this.searchQuery || //@ts-ignore
          user.lastName.toLowerCase().includes(this.searchQuery.value.searchQuery.toLowerCase());

        return matchesFirstName || matchesLastName;
      });
      this.totalRecords.set(this.filteredUsers.length); // Use the signal setter
      this.logging.log('Filtered users using local array');
    }
    this.cdref.detectChanges(); // Force change detection
  }

  ngOnInit(): void {
    this.users.getUsers({ limit: this.limitDefault }).subscribe({
      next: (data: any) => {
        this.conteggio = `${data.results} di ${data.counters.documentsActive}`;
        this.totalRecords.set(data.counters.documentsActive); // Use the signal setter
        data.data.document.forEach((item: any) => {
          const newUser = {
            firstName: item.firstName,
            lastName: item.lastName,
            codiceFiscale: item.codiceFiscale,
            email: item.email,
            _id: item._id,
            role: item.role,
          };
          const currentUsers = this.usersArray();
          this.usersArray.set([...currentUsers, newUser]);
        });
        this.filterUsers();
        this.logging.log('User data initialized successfully');
      },
      error: (err) => {
        this.showError(err.status);
        this.logging.error(`Failed to initialize user data with error: ${err.message}`);
      },
    });
    this.searchQuery.valueChanges.subscribe(() => {
      this.filterUsers();
      this.logging.log('search query changed');
    });
  }

  ngDoCheck(): void {
    this.Ciao = this.totalRecords(); // Update Ciao with the current value of totalRecords
  }

  getActivity(id: string) {
    const userId = id;
    this.users.getOneUserActivity(userId, this.pageDefault, this.limitDefault).subscribe({
      next: (result: any) => {
        this.userActivities = result;
        if (result.data.activities.length === 0) {
          this.visibleNoActivity = true;
        } else {
          this.router.navigate(['/admin-vis-utente-specifico', userId]);
        }
        this.logging.log(`Activity fetched for user ID: ${userId}`);
      },
      error: (err) => {
        this.showError(err.status);
        this.logging.error(`Failed to fetch activities for user ID: ${userId} with error: ${err.message}`);
      },
    });
  }

  onPageChange(event: any) {
    const pageNumber = event.page + 1;
    this.usersArray.set([]);
    this.users.getUsers({ pageNumber: pageNumber, limit: this.limitDefault }).subscribe({
      next: (data: any) => {
        this.conteggio = `${data.results} di ${data.counters.documentsActive}`;
        this.totalRecords.set(data.counters.documentsActive); // Use the signal setter
        console.log('On Page Change Total Records:', this.totalRecords()); // Debugging
        data.data.document.forEach((item: any) => {
          const currentUsers = this.usersArray();
          this.usersArray.set([...currentUsers, {
            firstName: item.firstName,
            lastName: item.lastName,
            codiceFiscale: item.codiceFiscale,
            email: item.email,
            _id: item._id,
            role: item.role,
          }]);
        });
        this.filterUsers();
        this.cdref.detectChanges(); // Force change detection
      },
      error: (err) => this.showError(err.status),
    });
  }

  changeLimit() {
    if (this.limit > this.totalRecords()) {
      this.limit = this.totalRecords();
    } else {
      const currentPage = this.first / this.rows + 1;
      this.limitDefault = this.limit;
      this.users.getUsers({ pageNumber: currentPage, limit: this.limitDefault }).subscribe({
        next: (data: any) => {
          this.conteggio = `${data.results} di ${data.counters.documentsActive}`;
          this.totalRecords.set(data.counters.documentsActive); // Use the signal setter
          this.usersArray.set([]);
          data.data.document.forEach((item: any) => {
            const currentUsers = this.usersArray();
            this.usersArray.set([...currentUsers, {
              firstName: item.firstName,
              lastName: item.lastName,
              codiceFiscale: item.codiceFiscale,
              email: item.email,
              _id: item._id,
              role: item.role,
            }]);
          });
          this.filterUsers();
          this.logging.log('Limit changed successfully');
        },
        error: (err) => {
          this.showError(err.status);
          this.logging.error(`Failed to change limit with error: ${err.message}`);
        },
      });
    }
  }

  userDeleted() {
    console.log('User deleted');
    this.logging.log('user deleted action triggered');
    this.refreshUsers();
  }

  refreshUsers() {
    this.users.getUsers({ limit: this.limitDefault }).subscribe({
      next: (data: any) => {
        this.conteggio = `${data.results} di ${data.counters.documentsActive}`;
        this.totalRecords.set(data.counters.documentsActive); // Use the signal setter
        this.usersArray.set([]);
        const newUsersArray = data.data.document.map((item: any) => ({
          firstName: item.firstName,
          lastName: item.lastName,
          codiceFiscale: item.codiceFiscale,
          email: item.email,
          _id: item._id,
          role: item.role,
        }));
        this.usersArray.set(newUsersArray);
        this.filterUsers();
        this.cdref.detectChanges();
        this.logging.log('Users refreshed successfully');
      },
      error: (err) => {
        this.showError(err.status);
        this.logging.error(`failed to refresh users with error: ${err.message}`);
      },
    });
  }

  editUser(id: string) {
    this.router.navigate([`/utenti/${id}`]);
    this.logging.log(`navigated to edit user ID: ${id}`);
  }

  exportToCsv(): void {
    console.log('Exporting ', this.filteredUsers);
    const csv = Papa.unparse(this.filteredUsers.map(item => ({
      Nome: item.firstName,
      Cognome: item.lastName,
      CodiceFiscale: item.codiceFiscale,
      email: item.email
    })));
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' }); // Converts data to CSV
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  exportToExcel(): void {
    const data = this.filteredUsers.map(item => ({
      Nome: item.firstName,
      Cognome: item.lastName,
      CodiceFiscale: item.codiceFiscale,
      email: item.email
    }));
    this.excelService.generateExcel(data, 'user_data');
  }
}

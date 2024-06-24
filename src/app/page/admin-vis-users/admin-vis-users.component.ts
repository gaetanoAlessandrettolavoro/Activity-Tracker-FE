import { Component, OnInit, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../componenti/footer/footer.component';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DeleteUserButtonComponent } from '../../componenti/delete-user-button/delete-user-button.component';
import { User } from '../../models/userModel';
import { Router } from '@angular/router';
import { NavbarAdminComponent } from '../../componenti/navbar-admin/navbar-admin.component';
import { DialogModule } from 'primeng/dialog';
import { AdminaddactivityforuserComponent } from '../../componenti/adminaddactivityforuser/adminaddactivityforuser.component';
import { AdminserviceService } from '../../servizi/adminservice.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { UserServiceService } from '../../servizi/user-service.service';

@Component({
  selector: 'app-admin-vis-user',
  standalone: true,
  templateUrl: './admin-vis-users.component.html',
  styleUrls: ['./admin-vis-users.component.css'],
  imports: [
    TableModule,
    ButtonModule,
    CommonModule,
    FooterComponent,
    PaginatorModule,
    InputTextModule,
    FormsModule,
    DeleteUserButtonComponent,
    NavbarAdminComponent,
    DialogModule,
    ButtonModule,
    InputTextModule,
    AdminaddactivityforuserComponent,
    ToastModule,
  ],
  providers: [MessageService],
})
export class AdminvisuserComponent implements OnInit {
  constructor(
    private users: AdminserviceService,
    private router: Router,
    private messageService: MessageService,
    private userService: UserServiceService,
  ) {}
  usersArray = signal<User[]>([]);
  value!: string;
  userActivities: any[] = [];

  cols = [
    { field: 'firstName', header: 'Nome' },
    { field: 'lastName', header: 'Cognome' },
    { field: 'codiceFiscale', header: 'Codice Fiscale' },
    { field: 'email', header: 'Email' },
  ];

  filteredUsers: User[] = [];
  searchText: string = '';
  fromDate: string = '';
  toDate: string = '';

  visible: boolean = false;

  visibleNoActivity: boolean = false;

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

  showDialog() {
    this.visible = true;
  }

  limit: number = 10;
  first: number = 0;
  rows: number = 10;

  filterUsers() {
    this.filteredUsers = this.usersArray().filter((user) => {
      const matchesText =
        !this.searchText ||
        user.firstName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        user.lastName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        user.codiceFiscale
          .toLowerCase()
          .includes(this.searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesDate = true; // Always true since we're not filtering by date anymore
      return matchesText && matchesDate;
    });
  }

  ngOnInit(): void {
    this.users.getUsers({ limit: this.limit }).subscribe({
      next: (data: any) => {
        data.data.document.forEach((item: any) => {
          this.usersArray().push({
            firstName: item.firstName,
            lastName: item.lastName,
            codiceFiscale: item.codiceFiscale,
            email: item.email,
            _id: item._id,
            role: item.role,
          });
        });
        this.filterUsers();
      },
      error: (err) => {
        this.show(err.status);
      },
    });
  }
  getActivity(id: string) {
    const userId = id;
    this.users.getOneUserActivity(userId).subscribe({
      next: (result: any) => {
        this.userActivities = result;
        if (result.data.activities.length == 0) {
          this.visibleNoActivity = true;
        } else {
          this.router.navigate(['/admin-vis-utente-specifico', userId]);
        }
      },
      error: (err) => {
        this.show(err.status);
      },
    });
    console.log(this.userActivities);
  }

  onPageChange(event: any) {
    console.log(event);
    const pageNumber = event.page + 1;
    this.usersArray.set([]);
    this.users
      .getUsers({ pageNumber: pageNumber, limit: this.limit })
      .subscribe({
        next: (data: any) => {
          data.data.document.forEach((item: any) => {
            console.log(item);
            this.usersArray().push({
              firstName: item.firstName,
              lastName: item.lastName,
              codiceFiscale: item.codiceFiscale,
              email: item.email,
              _id: item._id,
              role: item.role,
            });
          });
          this.filterUsers();
        },
        error: (err) => {
          this.show(err.status);
        },
      });
    console.log(pageNumber);
  }

  changeLimit() {
    const currentPage = this.first / this.rows + 1; // Calcola la pagina corrente
    this.users
      .getUsers({ pageNumber: currentPage, limit: this.limit })
      .subscribe({
        next: (data: any) => {
          this.usersArray.set([]);
          data.data.document.forEach((item: any) => {
            console.log(item);
            this.usersArray().push({
              firstName: item.firstName,
              lastName: item.lastName,
              codiceFiscale: item.codiceFiscale,
              email: item.email,
              _id: item._id,
              role: item.role,
            });
          });
          this.filterUsers();
        },
        error: (err) => {
          this.show(err.status);
        },
      });
    console.log(this.limit);
  }

  userDeleted() {
    console.log('User deleted');
    this.usersArray.set([]);
    this.filterUsers();
    this.users.getUsers({ limit: this.limit }).subscribe({
      next: (data: any) => {
        data.data.document.forEach((item: any) => {
          this.usersArray().push({
            firstName: item.firstName,
            lastName: item.lastName,
            codiceFiscale: item.codiceFiscale,
            email: item.email,
            _id: item._id,
            role: item.role,
          });
        });
        this.filterUsers();
      },
      error: (err) => {
        this.show(err.status);
      }
    });
  }
}

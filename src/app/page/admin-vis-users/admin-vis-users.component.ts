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

import { DialogModule } from 'primeng/dialog';
import { AdminaddactivityforuserComponent } from '../../componenti/adminaddactivityforuser/adminaddactivityforuser.component';
import { AdminserviceService } from '../../servizi/adminservice.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { UserServiceService } from '../../servizi/user-service.service';
import { ErrorServiziService } from '../../servizi/error-servizi.service';
import { ChangeDetectorRef } from '@angular/core';
import { AdminatoacceptusersComponent } from '../../componenti/adminatoacceptusers/adminatoacceptusers.component';

@Component({
    selector: 'app-admin-vis-user',
    standalone: true,
    templateUrl: './admin-vis-users.component.html',
    styleUrls: ['./admin-vis-users.component.css'],
    imports: [AdminatoacceptusersComponent,TableModule, ButtonModule, CommonModule, FooterComponent, PaginatorModule, InputTextModule, FormsModule, DeleteUserButtonComponent,DialogModule, ButtonModule, InputTextModule, AdminaddactivityforuserComponent,ToastModule],
    providers: [MessageService],
})
export class AdminvisuserComponent implements OnInit {
  constructor(
    private users: AdminserviceService,
    private router: Router,
    private messageService: MessageService,
    private userService: UserServiceService,
    private errors: ErrorServiziService,
    private cdref: ChangeDetectorRef
  ) {}

  usersArray = signal<User[]>([]);
  value!: string;
  userActivities: any[] = [];
  modaldmin : boolean = false

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

  showDialog() {
    this.visible = true;
  }
  limitDefault = 5;
  limit!: number;
  first: number = 0;
  rows: number = 10;
  pageDefault = 1;
  conteggio! : any

  changemodaladmin(){
    this.modaldmin = !this.modaldmin
    console.log(this.modaldmin)
  }

  filterUsers() {
    this.filteredUsers = this.usersArray().filter((user) => {
      const matchesFirstName =
        !this.searchFirstName ||
        user.firstName.toLowerCase().includes(this.searchFirstName.toLowerCase());

      const matchesLastName =
        !this.searchLastName ||
        user.lastName.toLowerCase().includes(this.searchLastName.toLowerCase());

      const matchesCodiceFiscale =
        !this.searchText ||
        user.codiceFiscale.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesEmail =
        !this.searchText ||
        user.email.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesDate = true;

      return (
        matchesFirstName &&
        matchesLastName &&
        matchesCodiceFiscale &&
        matchesEmail &&
        matchesDate
      );
    });
  
  }
  ngOnInit(): void {
    this.users.getUsers({ limit: this.limitDefault }).subscribe({
      next: (data: any) => {
        this.conteggio = data.results + " di " + data.totalDocumentsActive
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
        this.showError(err.status);
      },
    });
  }
  getActivity(id: string) {
    const userId = id;
    this.users
      .getOneUserActivity(userId, this.pageDefault, this.limitDefault)
      .subscribe({
        next: (result: any) => {
          this.userActivities = result;
          if (result.data.activities.length == 0) {
            this.visibleNoActivity = true;
          } else {
            this.router.navigate(['/admin-vis-utente-specifico', userId]);
          }
        },
        error: (err) => {
          this.showError(err.status);
        },
      });
  }

  onPageChange(event: any) {
    const pageNumber = event.page + 1;
    this.usersArray.set([]);
    console.log(this.limit);
    this.users
      .getUsers({ pageNumber: pageNumber, limit: this.limitDefault })
      .subscribe({
        next: (data: any) => {
          console.log(data.results)
          console.log( data.results + "/" + data.totalDocuments)
          this.conteggio = data.results + " di " + data.totalDocumentsActive
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
          this.cdref.detectChanges(); // Forza il rilevamento delle modifiche
        },
        error: (err) => {
          this.showError(err.status);
        },
      });
  }

  changeLimit() {
    const currentPage = this.first / this.rows + 1;
    this.limitDefault = this.limit;
    this.users
      .getUsers({ pageNumber: currentPage, limit: this.limitDefault })
      .subscribe({
        next: (data: any) => {
          console.log(data.results)
          console.log(data)
          this.conteggio = data.results + " di " + data.totalDocumentsActive
          this.usersArray.set([]);
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
          this.showError(err.status);
        },
      });
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
        this.showError(err.status);
      },
    });
  }
}


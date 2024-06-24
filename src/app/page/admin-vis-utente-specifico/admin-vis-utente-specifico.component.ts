import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule, DatePipe, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditActivityButtonComponent } from '../../componenti/edit-activity-button/edit-activity-button.component';
import { Activity } from '../../models/activityModel';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AdminVisTutteAttUsersComponent } from "../../componenti/admin-vis-tutte-att-users/admin-vis-tutte-att-users.component";

import { DeleteActivityButtonComponent } from '../../componenti/delete-activity-button/delete-activity-button.component';
import { MessageService } from 'primeng/api';
import { AdminserviceService } from '../../servizi/adminservice.service';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { UserServiceService } from '../../servizi/user-service.service';

@Component({
    selector: 'app-admin-vis-utente-specifico',
    standalone: true,
    templateUrl: './admin-vis-utente-specifico.component.html',
    styleUrls: ['./admin-vis-utente-specifico.component.css'],
    imports: [PaginatorModule, TableModule, ButtonModule, CommonModule, FormsModule, EditActivityButtonComponent, NgIf, DatePipe, AdminVisTutteAttUsersComponent, DeleteActivityButtonComponent, ToastModule],
    providers: [MessageService]
})
export class AdminVisUtenteSpecificoComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private admin: AdminserviceService, private messageService: MessageService, private userService: UserServiceService) { }
  first: number = 0;
  rows: number = 10;
  limit!: number;
  limitDefault = 5;
  pageDefault = 1;
  activities: Activity[] = [];

  cols = [
    { field: 'taskName', header: 'Attività' },
    { field: 'activityDate', header: 'Data' },
    { field: 'startTime', header: 'Orario di inizio' },
    { field: 'endTime', header: 'Orario di fine' },
    { field: 'notes', header: 'Note' },
  ];

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
    if (statusCode === 400) {
      this.router.navigate(['**']);
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.fetchActivities(id, this.pageDefault, this.limitDefault);
    });
  }

  show404() {
    this.router.navigate(['**']);
  }

  changeLimit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.fetchActivities(id, this.pageDefault, this.limit);
    });
  }

  onPageChange(event: any): void {
    const pageNumber = (event.page + 1);
    this.pageDefault = pageNumber;
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.fetchActivities(id, pageNumber, this.limit);
    });
  }

  private fetchActivities(id: string, page: number, limit: number): void {
    this.activities = []; // Reset the array before fetching new data
    this.admin.getOneUserActivity(id, page, limit).subscribe({
      next: (result: any) => {
        this.activities = result.data.activities.map((element: any) => ({
          taskName: element.taskName,
          startTime: new Date(element.startTime),
          endTime: new Date(element.endTime),
          notes: element.notes,
          taskID: element.taskID,
          _id: element._id,
          isActive: element.isActive
        }));
      },
      error: (err) => {
        if (err.status === 400) {
          this.show404();
        }
      }
    });
  }
}

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
import { DeleteActivityButtonComponent } from '../../componenti/delete-activity-button/delete-activity-button.component';
import { MessageService } from 'primeng/api';
import { AdminserviceService } from '../../servizi/adminservice.service';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { UserServiceService } from '../../servizi/user-service.service';
import { AdminaddactivityforuserComponent } from '../../componenti/adminaddactivityforuser/adminaddactivityforuser.component';
import { ErrorServiziService } from '../../servizi/error-servizi.service';

@Component({
    selector: 'app-admin-vis-utente-specifico',
    standalone: true,
    templateUrl: './admin-vis-utente-specifico.component.html',
    styleUrls: ['./admin-vis-utente-specifico.component.css'],
    imports: [AdminaddactivityforuserComponent,PaginatorModule, TableModule, ButtonModule, CommonModule, FormsModule, EditActivityButtonComponent, NgIf, DatePipe, DeleteActivityButtonComponent, ToastModule],
    providers: [MessageService]
})
export class AdminVisUtenteSpecificoComponent implements OnInit {
  apiUrl: any;
  constructor(private route: ActivatedRoute, private router: Router, private admin: AdminserviceService, private messageService: MessageService, private userService: UserServiceService, private errors: ErrorServiziService) { }
  first: number = 0;
  rows: number = 10;
  limit!: number;
  limitDefault = 5;
  pageDefault = 1;
  activities: Activity[] = [];
  idunivoco! : string;
  userEmail: string = ''; 

  cols = [
    { field: 'taskName', header: 'Attività' },
    { field: 'activityDate', header: 'Data' },
    { field: 'startTime', header: 'Orario di inizio' },
    { field: 'endTime', header: 'Orario di fine' },
    { field: 'notes', header: 'Note' },
  ];

  showError(statusCode: number) {
    if(statusCode === 401 || statusCode === 429) {
      this.messageService.add(this.errors.getErrorMessage(statusCode));
      setTimeout(() => {
        this.userService.logout();
        this.router.navigate(['/login']);
      }, 3000);
    } else if(statusCode === 400 || statusCode === 404) {      
      this.messageService.add(this.errors.getErrorMessage(statusCode));
      setTimeout(() => {
        this.router.navigate(["**"]);
      }, 1000);
    } else {
      this.messageService.add(this.errors.getErrorMessage(statusCode));
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.idunivoco = id
      this.fetchActivities(id, this.pageDefault, this.limitDefault);
      this.admin.getOneUser(id).subscribe({
        next:(res)=>{this.userEmail=res.data.email}
      })
    });
    

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
        this.showError(err.status);
      }
    });
  }
}

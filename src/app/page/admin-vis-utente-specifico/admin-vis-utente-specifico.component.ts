import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule, DatePipe, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditActivityButtonComponent } from '../../componenti/edit-activity-button/edit-activity-button.component';
import { Activity } from '../../models/activityModel';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteActivityButtonComponent } from '../../componenti/delete-activity-button/delete-activity-button.component';
import { MessageService } from 'primeng/api';
import { AdminserviceService } from '../../servizi/adminservice.service';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { UserServiceService } from '../../servizi/user-service.service';
import { ErrorServiziService } from '../../servizi/error-servizi.service';
import { UserTaskCreationComponent } from '../../componenti/user-task-creation/user-task-creation.component';

@Component({
    selector: 'app-admin-vis-utente-specifico',
    standalone: true,
    templateUrl: './admin-vis-utente-specifico.component.html',
    styleUrls: ['./admin-vis-utente-specifico.component.css'],
    imports: [PaginatorModule, TableModule, ButtonModule, CommonModule, FormsModule, EditActivityButtonComponent, NgIf, DatePipe, DeleteActivityButtonComponent, ToastModule, UserTaskCreationComponent],
    providers: [MessageService]
})
export class AdminVisUtenteSpecificoComponent implements OnInit {
  apiUrl: any;
  constructor(private route: ActivatedRoute, private router: Router, private admin: AdminserviceService, private messageService: MessageService, private userService: UserServiceService, private errors: ErrorServiziService) { }
  first: number = 0;
  limitDefault = 5;
  limit: number = this.limitDefault;
  pageDefault = 1;
  activities: Activity[] = [];
  idunivoco! : string;
  userEmail: string = ''; 
  conteggio! : any;
  totalRecords: number = 1;

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
      console.log(this.limitDefault)
      this.fetchActivities(id, this.pageDefault, this.limitDefault);
      this.admin.getOneUser(id).subscribe({
        next:(res)=>{this.userEmail=res.data.email}
      })
    });
    

  }

  changeLimit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if(this.limit == undefined)
        this.fetchActivities(id, this.pageDefault, this.limitDefault);
      else{
        this.fetchActivities(id, this.pageDefault, this.limit);
      }
    });
  }

  onPageChange(event: any): void {
    const pageNumber = (event.page + 1);
    this.pageDefault = pageNumber;
    console.log(this.pageDefault)
    this.route.params.subscribe(params => {
      const id = params['id'];
      console.log(this.limit)
      if(this.limit == undefined)
      this.fetchActivities(id, pageNumber, this.limitDefault);
    else{
      this.fetchActivities(id, pageNumber, this.limit);
    }
    });
  }

  private fetchActivities(id: string, page: number, limit: number): void {
    this.activities = []; 
  this.admin.getOneUserActivity(id, page, limit).subscribe({
    next: (result: any) => {
      this.conteggio = result.results + " di " + result.totalDocuments;
      this.totalRecords = result.totalDocuments;
      this.activities = result.data.activities.map((element: any) => ({
        taskName: element.taskName,
        startTime: new Date(element.startTime),
        endTime: new Date(element.endTime),
        notes: element.notes,
        taskID: element.taskID,
        _id: element._id,
        isActive: element.isActive
      }));
      this.messageService.add({severity:'success', summary: 'Successo', detail: 'Dati caricati con successo!'});
    },
    error: (err) => {
      this.showError(err.status);
    }
  });
  
}
}
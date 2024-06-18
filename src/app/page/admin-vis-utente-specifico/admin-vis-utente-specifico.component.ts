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
import { FooterComponent } from "../../componenti/footer/footer.component";
import { DeleteActivityButtonComponent } from '../../componenti/delete-activity-button/delete-activity-button.component';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-admin-vis-utente-specifico',
    standalone: true,
    templateUrl: './admin-vis-utente-specifico.component.html',
    styleUrls: ['./admin-vis-utente-specifico.component.css'],
    imports: [TableModule, ButtonModule, CommonModule, FormsModule, EditActivityButtonComponent, NgIf, DatePipe, AdminVisTutteAttUsersComponent, FooterComponent, DeleteActivityButtonComponent],
    providers: [MessageService]
})
export class AdminVisUtenteSpecificoComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router,private http: HttpClient, private messageService: MessageService) { }
  activities: Activity[] = [];


  cols = [
    { field: 'taskName', header: 'Attività' },
    { field: 'activityDate', header: 'Data' },
    { field: 'startTime', header: 'Orario di inizio' },
    { field: 'endTime', header: 'Orario di fine' },
    { field: 'notes', header: 'Note' },
  ];



  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.getUser(id).subscribe({
        next: (result: any) => {
          result.data.activities.forEach((element: any) => {
            if(element.isActive === true){
              this.activities.push({
                taskName: element.taskName,
                startTime : new Date(element.startTime),
                endTime : new Date(element.endTime),
                notes: element.notes,
                taskID: element.taskID,
                _id: element._id,
                isActive: element.isActive
              });
            }
          });
          console.log(this.activities)
        },
        error: (err) => {
          if(err.status === 400){
            this.show404()
          }
        }
      });
    });
  }

  show404(){
    this.router.navigate(['**']);
   }
  
  
  getUser(data: any): Observable<any> {
    return this.http.get<any>(` http://localhost:3000/api/v1/users/${data}/activities`,{ withCredentials: true })
  }
}
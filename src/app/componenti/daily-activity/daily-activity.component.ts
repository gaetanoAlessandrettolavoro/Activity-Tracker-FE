
import { CommonModule, DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Component, Input, OnInit, signal } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbarutente/navbarutente.component';
import { EditActivityButtonComponent } from '../edit-activity-button/edit-activity-button.component';
import { Activity } from '../../models/activityModel';
import { DeleteActivityButtonComponent } from '../delete-activity-button/delete-activity-button.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'daily-activity',
  standalone: true,
  imports: [TableModule, CommonModule,FooterComponent,NavbarComponent, EditActivityButtonComponent, DatePipe, DeleteActivityButtonComponent],
  templateUrl: './daily-activity.component.html',
  styleUrl: './daily-activity.component.css'
})
export class DailyActivityComponent implements OnInit{

  constructor(private http : HttpClient){}

  dailyActivity = signal<Activity[]>([]);

  private apiUrl = 'http://localhost:3000/api/v1/activities/me'; 

  getData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`, { withCredentials: true });
  }

  activities : any[] = []

  

  @Input({required: true}) inputDailyActivity!: Activity[];

  ngOnInit() {
    this.dailyActivity.set(this.inputDailyActivity);
    this.getData().subscribe({
      next: (result: any) => {
        result.data.userActivities.forEach((element: any) => {
           
            this.activities.push({
              activityDate: new Date(element.activityDate).toLocaleString(),
              startTime: new Date(element.startTime).toLocaleString(),
              endTime: new Date(element.endTime).toLocaleString()
          });
          console.log(this.activities)
        });
      },
      error: (error: any) => {
        console.error('Si è verificato un errore:', error);
      },
    });
  }





}
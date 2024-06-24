import { CommonModule, DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Component, Input, OnInit, booleanAttribute, effect, signal } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';

import { EditActivityButtonComponent } from '../edit-activity-button/edit-activity-button.component';
import { Activity } from '../../models/activityModel';
import { DeleteActivityButtonComponent } from '../delete-activity-button/delete-activity-button.component';
import { UserTaskCreationComponent } from '../user-task-creation/user-task-creation.component';
import { NoDailyActivityComponent } from '../no-daily-activity/no-daily-activity.component';
import { AdminserviceService } from '../../servizi/adminservice.service';

@Component({
  selector: 'daily-activity',
  standalone: true,
  imports: [TableModule, NoDailyActivityComponent, CommonModule, FooterComponent, EditActivityButtonComponent, DatePipe, DeleteActivityButtonComponent, UserTaskCreationComponent],
  templateUrl: './daily-activity.component.html',
  styleUrl: './daily-activity.component.css'
})
export class DailyActivityComponent {

  dailyActivity = signal(0);
  oggettistampati!: any[];
  nodailyactivity: Boolean = false;
  dailyactivitycomponent: Boolean = false;

  constructor(private adminService: AdminserviceService) {
    this.oggettistampati = []; 

    effect(() => {
      console.log(this.dailyActivity());
      this.adminService.getActivitiesByDate().subscribe(
        (result: any) => {
          if (result.data.userActivities.length === 0) {
            console.log("non ci sono dati");
            this.nodailyactivity = true;
            this.dailyactivitycomponent = false;
          } else {
            console.log("ci sono dati");
            this.nodailyactivity = false;
            this.dailyactivitycomponent = true;
            this.oggettistampati = []; 
            result.data.userActivities.forEach((element: any) => {
              let obj = {
                _id: element._id,
                taskName: element.taskName,
                taskID: element.taskID,
                activityDate: new Date(element.activityDate),
                startTime: new Date(element.startTime),
                endTime: new Date(element.endTime),
                notes: element.notes,
                userID: element.userID,
                isActive: element.isActive
              };
              this.oggettistampati.push(obj); 
            });

            console.log(this.oggettistampati); 
          }
        });
    });
  }

  gestiscivalori(event: any) {
    this.dailyActivity.update(c => c + 1);
  }
}

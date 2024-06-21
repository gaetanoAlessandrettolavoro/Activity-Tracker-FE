import { NgIf } from '@angular/common';
import { Component, OnInit, effect, signal } from '@angular/core';
import { DailyActivityComponent } from '../../componenti/daily-activity/daily-activity.component';
import { NoDailyActivityComponent } from '../../componenti/no-daily-activity/no-daily-activity.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FooterComponent } from '../../componenti/footer/footer.component';

import { Activity } from '../../models/activityModel';
import { GetActivityByDateService } from '../../servizi/get-activity-by-date.service';
import { UserTaskCreationComponent } from '../../componenti/user-task-creation/user-task-creation.component';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [NgIf, DailyActivityComponent, NoDailyActivityComponent, ProgressSpinnerModule,FooterComponent,UserTaskCreationComponent],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent implements OnInit{


  dailyActivity  = signal<Activity[]>([]);

  constructor(private getAct: GetActivityByDateService) { 

  }    
  ngOnInit(): void {
    this.getAct.getDaily().subscribe(
      (result: any) => {
        console.log(result)
        if(result.data.userActivities.length !== 0) {
          this.dailyActivity.set( result.data.userActivities.map((activity: any) => {
            return {
              _id: activity._id,
              taskName: activity.taskName,
              taskID: activity.taskID,
              activityDate: new Date(activity.activityDate),
              startTime: new Date(activity.startTime),
              endTime: new Date(activity.endTime),
              notes: activity.notes,
              userID: activity.userID,
              isActive: activity.isActive
            }
          
          }))
        }
      }
    );

  }
   
    onChildButtonClick() {
      window.location.reload();
    
    }

  }



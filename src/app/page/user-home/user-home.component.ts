import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DailyActivityComponent } from '../../componenti/daily-activity/daily-activity.component';
import { NoDailyActivityComponent } from '../../componenti/no-daily-activity/no-daily-activity.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FooterComponent } from '../../componenti/footer/footer.component';
import { NavbarComponent } from '../../componenti/navbarutente/navbarutente.component';
import { Activity } from '../../models/activityModel';
import { GetActivityByDateService } from '../../servizi/get-activity-by-date.service';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [NgIf, DailyActivityComponent, NoDailyActivityComponent, ProgressSpinnerModule,FooterComponent,NavbarComponent],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent implements OnInit{
  dailyActivity: Activity[] | null = null;

  constructor(private getAct: GetActivityByDateService) { }

  ngOnInit(): void {
    this.getAct.getDaily().subscribe(
      (result: any) => {
        if(result.data.userActivities.length !== 0) {
          this.dailyActivity = result.data.userActivities.map((activity: any) => {
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
          })
        }
      }
    );

  }

}

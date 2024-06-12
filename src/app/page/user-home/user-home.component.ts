import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { DailyActivityComponent } from '../../componenti/daily-activity/daily-activity.component';
import { NoDailyActivityComponent } from '../../componenti/no-daily-activity/no-daily-activity.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FooterComponent } from '../../componenti/footer/footer.component';
import { NavbarComponent } from '../../componenti/navbarutente/navbarutente.component';
import { Activity } from '../../models/activityModel';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [NgIf, DailyActivityComponent, NoDailyActivityComponent, ProgressSpinnerModule,FooterComponent,NavbarComponent],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent {
  dailyActivity: Activity | null = {
    taskName: 'Running',
    activityDate: new Date(2021, 6, 7),
    startTime: new Date(2021, 6, 7, 9, 0),
    endTime: new Date(2021, 6, 7, 10, 0),
    notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  }

  // dailyActivity: DailyActivity | null = null;
}

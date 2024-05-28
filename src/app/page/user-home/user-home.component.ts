import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { DailyActivityComponent } from '../../componenti/daily-activity/daily-activity.component';
import { NoDailyActivityComponent } from '../../componenti/no-daily-activity/no-daily-activity.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FooterComponent } from '../../componenti/footer/footer.component';
import { NavbarComponent } from '../../componenti/navbarutente/navbarutente.component';

interface DailyActivity {
  activityType: string;
  data: string;
  orarioInizio: string;
  orarioFine: string;
  note: string;
}

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [NgIf, DailyActivityComponent, NoDailyActivityComponent, ProgressSpinnerModule,FooterComponent,NavbarComponent],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent {
  dailyActivity: DailyActivity | null = {
    activityType: 'Running',
    data: "17-07-2021",
    orarioInizio: "10:00",
    orarioFine: "11:00",
    note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  }

  // dailyActivity: DailyActivity | null = null;
}

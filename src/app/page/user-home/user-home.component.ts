import { NgIf } from '@angular/common';
import { Component, OnInit, effect, signal } from '@angular/core';
import { DailyActivityComponent } from '../../componenti/daily-activity/daily-activity.component';
import { NoDailyActivityComponent } from '../../componenti/no-daily-activity/no-daily-activity.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FooterComponent } from '../../componenti/footer/footer.component';

import { Activity } from '../../models/activityModel';
import { UserTaskCreationComponent } from '../../componenti/user-task-creation/user-task-creation.component';
import { AdminserviceService } from '../../servizi/adminservice.service';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [DailyActivityComponent],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent {

}



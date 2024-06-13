import { CommonModule, DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Component, Input, OnInit, signal } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbarutente/navbarutente.component';
import { EditActivityButtonComponent } from '../edit-activity-button/edit-activity-button.component';
import { Activity } from '../../models/activityModel';
import { DeleteActivityButtonComponent } from '../delete-activity-button/delete-activity-button.component';

@Component({
  selector: 'daily-activity',
  standalone: true,
  imports: [TableModule, CommonModule,FooterComponent,NavbarComponent, EditActivityButtonComponent, DatePipe, DeleteActivityButtonComponent],
  templateUrl: './daily-activity.component.html',
  styleUrl: './daily-activity.component.css'
})
export class DailyActivityComponent implements OnInit{
  dailyActivity = signal<Activity[]>([]);

  @Input({required: true}) inputDailyActivity!: Activity;

  ngOnInit() {
    this.dailyActivity.set([...this.dailyActivity(), this.inputDailyActivity]);
  }
}
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Component, OnInit, signal } from '@angular/core';

interface DailyActivity {
  activityType: string;
  data: string;
  orarioInizio: string;
  orarioFine: string;
  note: string;
}

@Component({
  selector: 'daily-activity',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './daily-activity.component.html',
  styleUrl: './daily-activity.component.css'
})
export class DailyActivityComponent implements OnInit{
  dailyActivity = signal<DailyActivity[]>([]);

  ngOnInit() {
    const newDailyActivity = {
      activityType: 'Running',
      data: "17-07-2021",
      orarioInizio: "10:00",
      orarioFine: "11:00",
      note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }
    this.dailyActivity.set([...this.dailyActivity(), newDailyActivity]);
  }
}

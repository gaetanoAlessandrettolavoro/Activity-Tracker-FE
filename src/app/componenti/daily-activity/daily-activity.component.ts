import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Component, Input, OnInit, signal } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbarutente/navbarutente.component';

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
  imports: [TableModule, CommonModule,FooterComponent,NavbarComponent],
  templateUrl: './daily-activity.component.html',
  styleUrl: './daily-activity.component.css'
})
export class DailyActivityComponent implements OnInit{
  dailyActivity = signal<DailyActivity[]>([]);

  @Input({required: true}) inputDailyActivity!: DailyActivity;

  ngOnInit() {
    this.dailyActivity.set([...this.dailyActivity(), this.inputDailyActivity]);
  }
}

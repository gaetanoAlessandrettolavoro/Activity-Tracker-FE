import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { AdminserviceService } from '../../servizi/adminservice.service';
import { User } from '../../models/userModel';
import { ChartsService } from '../../servizi/charts.service';

interface SimpleUser {
  name: string;
  _id: string;
}

@Component({
  selector: 'stacked-bar',
  standalone: true,
  imports: [ChartModule, CalendarModule, FormsModule, DropdownModule],
  templateUrl: './stacked-bar.component.html',
  styleUrl: './stacked-bar.component.css',
})
export class StackedBarComponent {
  protected documentStyle = getComputedStyle(document.documentElement);
  protected textColor = this.documentStyle.getPropertyValue('--text-color');
  protected textColorSecondary = this.documentStyle.getPropertyValue(
    '--text-color-secondary'
  );
  protected surfaceBorder =
    this.documentStyle.getPropertyValue('--surface-border');

  protected today: Date = new Date();
  protected dates: Date[] | undefined;
  protected users = signal<SimpleUser[]>([]);
  protected selectedUser = signal<SimpleUser>({} as SimpleUser);

  protected data: any;
  protected options: any = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false,
      },
      legend: {
        labels: {
          color: this.textColor,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: this.textColorSecondary,
        },
        grid: {
          color: this.surfaceBorder,
          drawBorder: false,
        },
      },
      y: {
        stacked: true,
        ticks: {
          color: this.textColorSecondary,
        },
        grid: {
          color: this.surfaceBorder,
          drawBorder: false,
        },
      },
    },
  };

  constructor(private adminService: AdminserviceService, private chartsService: ChartsService) {}

  selectedDates() {}

  ngOnInit() {
    this.adminService.getUsers().subscribe({
      next: (res) => {
        this.users.set(
          res.data.document.map((el: User) => ({
            name: `${el.firstName} ${el.lastName}`,
            _id: el._id,
          }))
        );
      },
      error: (err) => {
        console.error(err);
      },
    });

    this.chartsService.hoursPerUser('667c3301922cb5b570b8bd13', new Date(2024, 6, 1), new Date(2024, 6, 11)).subscribe({
      next: (res) => {
        console.log(res);
        this.data = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}

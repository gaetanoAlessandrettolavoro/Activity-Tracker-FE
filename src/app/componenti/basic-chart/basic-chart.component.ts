import { Component, OnInit, signal } from '@angular/core';
import { BasicData, ChartsService } from '../../servizi/charts.service';
import { ChartModule } from 'primeng/chart';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { UserServiceService } from '../../servizi/user-service.service';
import { ErrorServiziService } from '../../servizi/error-servizi.service';
import { DialogModule } from 'primeng/dialog';
import { AdminserviceService } from '../../servizi/adminservice.service';
import { User } from '../../models/userModel';
import { ActivitiesServicesService } from '../../servizi/activities-services.service';
import { Activity } from '../../models/activityModel';
import { DatePipe } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'basic-chart',
  standalone: true,
  imports: [ChartModule, ToastModule, DialogModule, DatePipe, CalendarModule, FormsModule],
  templateUrl: './basic-chart.component.html',
  styleUrl: './basic-chart.component.css',
  providers: [MessageService],
})
export class BasicChartComponent implements OnInit {
  basicData!: BasicData;
  basicOptions: any;
  clickedTaskName!: string;
  clickedUser = signal<User>({} as User);
  clickedActivity = signal<Activity>({} as Activity);
  visible: boolean = false;
  date: Date = new Date();
  tomorrow: Date = new Date();

  constructor(
    private chartServ: ChartsService,
    private messageService: MessageService,
    private router: Router,
    private userService: UserServiceService,
    private errors: ErrorServiziService,
    private adminService: AdminserviceService,
    private activitiesService: ActivitiesServicesService
  ) {}

  showError(statusCode: number) {
    if(statusCode === 401 || statusCode === 429) {
      this.messageService.add(this.errors.getErrorMessage(statusCode));
      setTimeout(() => {
        this.userService.logout();
        this.router.navigate(['/login']);
      }, 3000);
    } else {
      this.messageService.add(this.errors.getErrorMessage(statusCode));
    }
  }

  getDatas() {
    this.chartServ.hoursPerActivity(this.date).subscribe({
      next: (data) => {
        this.basicData = data[0];
      },
      error: (error) => {
        this.showError(parseInt(error.message));
      }
    });
  }

  selectedDate(){
    this.getDatas();
  }

  ngOnInit(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary',
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.getDatas();

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
      maintainAspectRatio: false,
    };
  }

  handleClick(event: any) {
    this.adminService.getOneUser(this.basicData.datasets[0].userID[event.element.index]).subscribe({
      next: (res) => {
        this.clickedUser.set(res.data);
        this.clickedTaskName = this.basicData.datasets[0].taskName[event.element.index];
        this.activitiesService.getOneActivity(this.basicData.datasets[0]._id[event.element.index]).subscribe({
          next: (res: any) => {
            this.clickedActivity.set(res.data.document);
            this.visible = true;
          },
          error: (err) => this.showError(err.status)
        })
      },
      error: (err) => this.showError(err.status)
    })
  }
}

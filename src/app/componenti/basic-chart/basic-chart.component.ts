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
import { DatePipe, DecimalPipe, NgForOf } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { ServiceTasksService } from '../../servizi/service-tasks.service';
import { Task } from '../../models/taskModel';
import { ProgressBarModule } from 'primeng/progressbar';
import { DividerModule } from 'primeng/divider';
import { LoggingService } from '../../servizi/logging.service';

interface customInterface {
  activity: Activity,
  user: User
}

@Component({
  selector: 'basic-chart',
  standalone: true,
  imports: [ChartModule, ToastModule, DialogModule, DatePipe, CalendarModule, FormsModule, ProgressBarModule, NgForOf, DividerModule, DecimalPipe],
  templateUrl: './basic-chart.component.html',
  styleUrl: './basic-chart.component.css',
  providers: [MessageService],
})
export class BasicChartComponent implements OnInit {
  basicData!: BasicData;
  basicOptions: any;
  clickedTaskName!: string;
  clickedTask = signal<Task>({} as Task);
  clickedHours = signal<number>(0);
  detailsActivities = signal<Activity[]>([]);
  detailsToPrint = signal<customInterface[]>([]);
  visibleDetail: boolean = false;
  date: Date = new Date();
  today: Date = new Date();

  constructor(
    private chartServ: ChartsService,
    private messageService: MessageService,
    private router: Router,
    private userService: UserServiceService,
    private errors: ErrorServiziService,
    private adminService: AdminserviceService,
    private activitiesService: ActivitiesServicesService,
    private tasksService: ServiceTasksService,
    private logging: LoggingService
  ) {}

  showError(statusCode: number, errorMessage?: string) {
    if(!errorMessage) {
      this.logging.error(`Error occurred fetching datas in basic chart on Date ${this.date}`);
    } else {
      this.logging.error(`Error occurred showing details in basic chart.\nError ${statusCode} with message: ${errorMessage}`);
    }
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
    this.detailsToPrint.set([]);
    this.clickedTaskName = this.basicData.labels[event.element.index];
    this.clickedHours.set(this.basicData.datasets[0].data[event.element.index]);
    this.tasksService.getSingleTaskByName(this.basicData.labels[event.element.index]).subscribe({
      next: (res: any) => {
        this.clickedTask.set(res.data.document[0]);
        this.activitiesService.getActivitiesToChart({ taskName: this.basicData.labels[event.element.index], fromDate: this.date.toISOString().split('T')[0] }).subscribe({
          next: (result: any) => {
            this.detailsActivities.set(result.data.document);
            for(let act of this.detailsActivities()){
              //@ts-ignore
              this.adminService.getOneUser(act.userID).subscribe({
                next: (res) => {
                  const newCustomItem: customInterface[] = [...this.detailsToPrint(), {activity: act, user: res.data}];
                  this.detailsToPrint.set(newCustomItem);
                  this.visibleDetail = true;
                },
                error: (error) => this.showError(error.status, error.error.message)
              })
            }
          },
          error: (error) => this.showError(error.status, error.error.message)
        })
      },
      error: (error) => this.showError(error.status, error.error.message)
    })
  }
}

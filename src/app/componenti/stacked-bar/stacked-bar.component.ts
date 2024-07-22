import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { AdminserviceService } from '../../servizi/adminservice.service';
import { User } from '../../models/userModel';
import { ChartsService } from '../../servizi/charts.service';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { UserServiceService } from '../../servizi/user-service.service';
import { Router } from '@angular/router';
import { ErrorServiziService } from '../../servizi/error-servizi.service';
import { LoggingService } from '../../servizi/logging.service';

interface SimpleUser {
  name: string;
  _id: string;
}

@Component({
  selector: 'stacked-bar',
  standalone: true,
  imports: [ChartModule, CalendarModule, FormsModule, DropdownModule, ButtonModule, ToastModule],
  templateUrl: './stacked-bar.component.html',
  styleUrl: './stacked-bar.component.css',
  providers: [MessageService]
})
export class StackedBarComponent {
  protected documentStyle = getComputedStyle(document.documentElement);
  protected textColor = this.documentStyle.getPropertyValue('--text-color');
  protected textColorSecondary = this.documentStyle.getPropertyValue('--text-color-secondary');
  protected surfaceBorder = this.documentStyle.getPropertyValue('--surface-border');

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

  constructor(private adminService: AdminserviceService, private chartsService: ChartsService, private messageService: MessageService, private userService: UserServiceService, private router: Router, private errors: ErrorServiziService, private logging: LoggingService) {}

  showError(statusCode: number, errorMessage?: string) {
    if(!!errorMessage) {
      this.logging.error(`Error occurred fetching data in stacked-bar chart.\nError ${statusCode} with message: ${errorMessage}`);
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

  getChart(userID: string, fromDate: Date, toDate: Date){
    this.chartsService.hoursPerUser(userID, fromDate, toDate).subscribe({
      next: (res) => {
        console.log(res);
        this.data = res;
        this.logging.info(`Stacked-bar chart successfully loaded`);
      },
      error: (err) => {
        this.showError(err.status, err.error.message);
      }
    })
  }

  onClickSearch() {
    if(this.dates && this.selectedUser().name){
      this.getChart(this.selectedUser()._id, this.dates[0], this.dates[1]);
    }
  }

  ngOnInit() {
    this.adminService.getUsers().subscribe({
      next: (res) => {
        this.users.set(
          res.data.document.map((el: User) => ({
            name: `${el.firstName} ${el.lastName}`,
            _id: el._id,
          }))
        );
        this.logging.info(`Users successfully loaded`);
      },
      error: (err) => {
        this.showError(err.status, err.error.message);
      },
    });
  }
}

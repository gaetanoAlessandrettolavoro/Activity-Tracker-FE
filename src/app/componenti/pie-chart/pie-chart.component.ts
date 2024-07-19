import { Component, OnInit, signal } from '@angular/core';
import { ChartsService, PieData } from '../../servizi/charts.service';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { User } from '../../models/userModel';
import { AdminserviceService } from '../../servizi/adminservice.service';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DatePipe, NgIf } from '@angular/common';
import { Activity } from '../../models/activityModel';
import { DividerModule } from 'primeng/divider';
import { SidebarModule } from 'primeng/sidebar';
import { LoggingService } from '../../servizi/logging.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { UserServiceService } from '../../servizi/user-service.service';
import { ErrorServiziService } from '../../servizi/error-servizi.service';
import { Router } from '@angular/router';

interface simpleUser {
  name: string;
  _id: string;
}

@Component({
  selector: 'pie-chart',
  standalone: true,
  imports: [CalendarModule, FormsModule, ChartModule, DropdownModule, ButtonModule, DialogModule, DatePipe, NgIf, ToastModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css',
  providers: [MessageService]
})
export class PieChartComponent implements OnInit {
  protected documentStyle = getComputedStyle(document.documentElement);
  protected textColor = this.documentStyle.getPropertyValue('--text-color');
  protected date: Date | undefined;
  protected today: Date = new Date();
  protected options: any;
  protected data: PieData | undefined;
  protected searched: boolean = false;
  protected users = signal<simpleUser[]>([]);
  protected selectedUser: simpleUser = {} as simpleUser;
  protected indexDetail = signal<number>(0);
  protected activityDetail = signal<Activity>({} as Activity);

  protected detailVisible: boolean = false;

  constructor(private chartsService: ChartsService, private adminService: AdminserviceService, private logging: LoggingService, private messageService: MessageService, private userService: UserServiceService, private errors: ErrorServiziService, private router: Router){}

  showError(statusCode: number, errorMessage?: string) {
    if(!!errorMessage) {
      this.logging.error(`Error occurred fetching data in pie chart.\nError ${statusCode} with message: ${errorMessage}`);
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

  getUsers() {
    this.adminService.getUsers().subscribe({
      next: (res) => {
        this.users.set(res.data.document.map((el: User) => ({
          name: `${el.firstName} ${el.lastName}`,
          _id: el._id
        })))
      },
      error: (error) => {
        this.showError(error.status, error.error.message);
      }
    })
  }

  onHideDialog() {
    this.selectedUser = {name: '', _id: ''};
  }

  getChart(): void {
    if(this.date && this.selectedUser){
      // console.log(this.selectedUser);
      const selectedDate = this.date;
      const nextDay = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate()+1);
      this.chartsService.activitiesPerUsers(this.selectedUser._id, selectedDate, nextDay).subscribe({
        next: (res) => {
          this.data = res;
          this.searched = true;

          this.options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: this.textColor
                    }
                }
            }
          };
          this.logging.info(`Pie chart successfully loaded`);
        },
        error: (err) => {
          this.showError(err.status, err.error.message);
        }
      })
    }
  }

  onClickSearch() {
    if(this.selectedUser.name !== '' && this.selectedUser._id !== ''){
      this.getChart();
    }
  }

  handleClick(event: any){
    this.indexDetail.set(event.element.index);
    const time: string | undefined = this.data?.labels[this.indexDetail()].split('|')[1].trim();
    const startTime: string | undefined = time?.split('-')[0].trim();
    const endTime: string | undefined = time?.split('-')[1].trim();
    // console.log(startTime, endTime);
    if(this.date && startTime && endTime){
      const startDate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), parseInt(startTime.split(':')[0]), parseInt(startTime.split(':')[1]));
      const endDate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), parseInt(endTime.split(':')[0]), parseInt(endTime.split(':')[1]));
      this.adminService.getOneActivity(this.selectedUser._id, startDate, endDate).subscribe({
        next: (res: any) => {
          this.activityDetail.set(res.data.activities[0])
          this.detailVisible = true;
          this.logging.info(`Detail loaded successfully loaded in pie chart`);
        },
        error: (err) => {
          this.showError(err.status, err.error.message);
        }
      })
    }
  }

  closeDetail() {
    this.detailVisible = false;
  }

  ngOnInit() {
    this.getUsers();
  }
}

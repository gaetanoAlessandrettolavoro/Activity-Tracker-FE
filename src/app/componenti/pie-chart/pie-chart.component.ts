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

interface simpleUser {
  name: string;
  _id: string;
}

@Component({
  selector: 'pie-chart',
  standalone: true,
  imports: [CalendarModule, FormsModule, ChartModule, DropdownModule, ButtonModule, DialogModule, DatePipe, NgIf, DividerModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent implements OnInit {
  protected documentStyle = getComputedStyle(document.documentElement);
  protected textColor = this.documentStyle.getPropertyValue('--text-color');
  protected date: Date | undefined;
  protected today: Date = new Date();
  protected options: any;
  protected data: PieData | undefined;
  protected users = signal<simpleUser[]>([]);
  protected selectedUser: simpleUser = {name: '', _id: ''};
  protected indexDetail = signal<number>(0);
  protected activityDetail = signal<Activity>({} as Activity);

  protected pieVisible: boolean = false;
  protected detailVisible: boolean = false;

  constructor(private chartsService: ChartsService, private adminService: AdminserviceService){}

  getUsers() {
    this.adminService.getUsers().subscribe({
      next: (res) => {
        this.users.set(res.data.document.map((el: User) => ({
          name: `${el.firstName} ${el.lastName}`,
          _id: el._id
        })))
      },
      error: (error) => {
        console.error(error);
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
          this.pieVisible = true;

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
        },
        error: (err) => console.error(err)
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
      const startDate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), parseInt(startTime.split(':')[0])+2, parseInt(startTime.split(':')[1]));
      const endDate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), parseInt(endTime.split(':')[0])+2, parseInt(endTime.split(':')[1]));
      this.adminService.getOneActivity(this.selectedUser._id, startDate, endDate).subscribe({
        next: (res: any) => {
          this.activityDetail.set(res.data.activities[0])
          this.detailVisible = true;
        },
        error: (err) => {
          console.error(err);
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

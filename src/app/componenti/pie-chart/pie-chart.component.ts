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

interface simpleUser {
  name: string;
  _id: string;
}

@Component({
  selector: 'pie-chart',
  standalone: true,
  imports: [CalendarModule, FormsModule, ChartModule, DropdownModule, ButtonModule, DialogModule, DatePipe, NgIf],
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
  protected selectedUser: simpleUser = {name: '', _id: '667c3301922cb5b570b8bd13'};
  protected pieVisible: boolean = false;

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
    this.getChart();
  }

  handleClick(event: any){
    console.log(event);
  }

  ngOnInit() {
    this.getUsers();
  }
}

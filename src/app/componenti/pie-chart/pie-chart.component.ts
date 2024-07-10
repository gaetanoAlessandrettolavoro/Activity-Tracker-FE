import { Component } from '@angular/core';
import { ChartsService, PieData } from '../../servizi/charts.service';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'pie-chart',
  standalone: true,
  imports: [CalendarModule, FormsModule, ChartModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent {
  protected documentStyle = getComputedStyle(document.documentElement);
  protected textColor = this.documentStyle.getPropertyValue('--text-color');
  protected date: Date | undefined;
  protected today: Date = new Date();
  protected options: any;
  protected data: PieData | undefined

  constructor(private chartsService: ChartsService){}

  getChart(): void {
    if(this.date){
      const selectedDate = this.date;
      const nextDay = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate()+1);
      this.chartsService.activitiesPerUsers('667c3301922cb5b570b8bd13', selectedDate, nextDay).subscribe({
        next: (res) => {
          this.data = res;

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
  
  selectedDate(){
    this.getChart();
  }

  handleClick(event: any){
    console.log(event);
  }
}

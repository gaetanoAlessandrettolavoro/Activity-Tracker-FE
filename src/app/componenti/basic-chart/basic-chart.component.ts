import { Component, OnInit } from '@angular/core';
import { BasicData, ChartsService } from '../../servizi/charts.service';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'basic-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './basic-chart.component.html',
  styleUrl: './basic-chart.component.css'
})
export class BasicChartComponent implements OnInit{
  basicData!: BasicData;
  basicOptions: any;

  constructor(private chartServ: ChartsService) {}

  ngOnInit(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.chartServ.hoursPerActivity().subscribe((data) => {
      this.basicData = data[0];
    });

    this.basicOptions = {
      plugins: {
          legend: {
              labels: {
                  color: textColor
              }
          }
      },
      scales: {
          y: {
              beginAtZero: true,
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          },
          x: {
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          }
      }
  };

  }

}

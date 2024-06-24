import { Component, OnInit } from '@angular/core';
import { BasicData, ChartsService } from '../../servizi/charts.service';
import { ChartModule } from 'primeng/chart';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { UserServiceService } from '../../servizi/user-service.service';

@Component({
  selector: 'basic-chart',
  standalone: true,
  imports: [ChartModule, ToastModule],
  templateUrl: './basic-chart.component.html',
  styleUrl: './basic-chart.component.css',
  providers: [MessageService],
})
export class BasicChartComponent implements OnInit {
  basicData!: BasicData;
  basicOptions: any;

  constructor(
    private chartServ: ChartsService,
    private messageService: MessageService,
    private router: Router,
    private userService: UserServiceService,
  ) {}

  show(statusCode: number) {
    if (statusCode === 401) {
      this.messageService.add({
        severity: 'error',
        summary: 'Errore 401',
        detail: 'Sembra che tu non sia autenticato. Accedi per continuare.',
      });
      setTimeout(() => {
        this.userService.logout();
        this.router.navigate(['/login']);
      }, 3000);
    }
    if (statusCode === 500) {
      this.messageService.add({
        severity: 'error',
        summary: 'Errore 500',
        detail: 'Errore interno del server, riprova più tardi.',
      });
    }
  }

  ngOnInit(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary',
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.chartServ.hoursPerActivity().subscribe({
      next: (data) => {
        this.basicData = data[0];
      },
      error: (error) => {
        this.show(parseInt(error.message));
      }
    });

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
    };
  }
}

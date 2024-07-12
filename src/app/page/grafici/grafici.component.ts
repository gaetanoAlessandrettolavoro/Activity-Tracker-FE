import { Component, OnInit } from '@angular/core';
import { BasicChartComponent } from '../../componenti/basic-chart/basic-chart.component';
import { PieChartComponent } from '../../componenti/pie-chart/pie-chart.component';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { NgIf } from '@angular/common';
import { StackedBarComponent } from '../../componenti/stacked-bar/stacked-bar.component';

@Component({
  selector: 'app-grafici',
  standalone: true,
  imports: [BasicChartComponent, PieChartComponent, TabMenuModule, NgIf, StackedBarComponent],
  templateUrl: './grafici.component.html',
  styleUrl: './grafici.component.css'
})
export class GraficiComponent {
  items: MenuItem[] = [
    { label: 'Task/Giorno', icon: 'pi pi-chart-bar' },
    { label: 'Utente/Giorno', icon: 'pi pi-chart-pie' },
    { label: 'Ore di attività', icon: 'pi pi-calendar-clock' },
  ];

  activeItem: MenuItem = this.items[0];

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }
}

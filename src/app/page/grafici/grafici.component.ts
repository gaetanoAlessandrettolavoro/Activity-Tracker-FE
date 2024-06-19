import { Component } from '@angular/core';
import { BasicChartComponent } from '../../componenti/basic-chart/basic-chart.component';

@Component({
  selector: 'app-grafici',
  standalone: true,
  imports: [BasicChartComponent],
  templateUrl: './grafici.component.html',
  styleUrl: './grafici.component.css'
})
export class GraficiComponent {

}

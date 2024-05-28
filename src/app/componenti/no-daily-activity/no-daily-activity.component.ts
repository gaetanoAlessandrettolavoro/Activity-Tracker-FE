import { Component } from '@angular/core';
import { NavbarComponent } from '../navbarutente/navbarutente.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'no-daily-activity',
  standalone: true,
  imports: [NavbarComponent,FooterComponent],
  templateUrl: './no-daily-activity.component.html',
  styleUrl: './no-daily-activity.component.css'
})
export class NoDailyActivityComponent {

}

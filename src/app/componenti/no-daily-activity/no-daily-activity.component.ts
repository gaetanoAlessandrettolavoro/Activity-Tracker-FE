import { Component } from '@angular/core';

import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'no-daily-activity',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './no-daily-activity.component.html',
  styleUrl: './no-daily-activity.component.css'
})
export class NoDailyActivityComponent {

}

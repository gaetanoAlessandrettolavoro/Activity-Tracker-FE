import { Component } from '@angular/core';
import { NavbarhomeComponent } from '../../componenti/navbarhome/navbarhome.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NavbarhomeComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}

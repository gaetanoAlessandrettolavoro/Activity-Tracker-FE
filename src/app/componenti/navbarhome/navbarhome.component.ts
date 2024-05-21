import { Component } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'navbarhome',
  standalone: true,
  providers:[PrimeIcons],
  imports:[ButtonModule,NavbarhomeComponent],
  templateUrl: './navbarhome.component.html',
  styleUrl: './navbarhome.component.css'
})
export class NavbarhomeComponent {

   
    


}

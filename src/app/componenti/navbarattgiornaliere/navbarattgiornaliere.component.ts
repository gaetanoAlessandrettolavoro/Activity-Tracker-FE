import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button'

@Component({
  selector: 'navbarattgiornaliere',
  templateUrl: './navbarattgiornaliere.component.html',
  styleUrls: ['./navbarattgiornaliere.component.css'],
  standalone: true,
  imports: [MenubarModule, ButtonModule]
})
export class NavbarComponent{


}
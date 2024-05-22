import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button'

@Component({
  selector: 'navbarutente',
  templateUrl: './navbarutente.component.html',
  styleUrls: ['./navbarutente.component.css'],
  standalone: true,
  imports: [MenubarModule, ButtonModule]
})
export class NavbarComponent{


}

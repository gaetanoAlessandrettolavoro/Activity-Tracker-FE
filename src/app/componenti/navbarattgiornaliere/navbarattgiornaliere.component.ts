import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button'
import { UserManualComponent } from '../user-manual/user-manual.component';

@Component({
  selector: 'navbarattgiornaliere',
  templateUrl: './navbarattgiornaliere.component.html',
  styleUrls: ['./navbarattgiornaliere.component.css'],
  standalone: true,
  imports: [MenubarModule, ButtonModule,UserManualComponent]
})
export class NavbarComponent{


}
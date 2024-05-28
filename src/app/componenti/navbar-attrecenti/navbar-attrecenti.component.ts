import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { UserManualComponent } from '../user-manual/user-manual.component';


@Component({
  selector: 'app-navbar-attrecenti',
  standalone: true,
  imports: [MenubarModule, ButtonModule,UserManualComponent],
  templateUrl: './navbar-attrecenti.component.html',
  styleUrl: './navbar-attrecenti.component.css'
})
export class NavbarAttrecentiComponent{

}

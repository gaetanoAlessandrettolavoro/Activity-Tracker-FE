import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button'
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar-admin',
  standalone: true,
  imports: [MenubarModule, ButtonModule, RouterLink],
  templateUrl: './navbar-admin.component.html',
  styleUrl: './navbar-admin.component.css'
})
export class NavbarAdminComponent {

}







import { Component } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { UserManualComponent } from '../user-manual/user-manual.component';

@Component({
  selector: 'navbarhome',
  standalone: true,
  providers: [PrimeIcons],
  imports: [ButtonModule, NavbarhomeComponent,UserManualComponent],
  templateUrl: './navbarhome.component.html',
  styleUrl: './navbarhome.component.css',
})
export class NavbarhomeComponent {
  constructor(private router: Router) {}

  navigateToRegister() {
    this.router.navigate(['registrati']);
  }

  navigateToLogin() {
    this.router.navigate(['login']);
  }
}

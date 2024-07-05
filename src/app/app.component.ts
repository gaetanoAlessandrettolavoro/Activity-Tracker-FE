import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImpostaNuovaPasswordComponent } from './page/imposta-nuova-password/imposta-nuova-password.component';
import { UserHomeComponent } from './page/user-home/user-home.component';
import { AttivitaRecentiUtenteComponent } from './page/attivita-recenti-utente/attivita-recenti-utente/attivita-recenti-utente.component';
import { AdminvisuserComponent } from './page/admin-vis-users/admin-vis-users.component';
import { UserManualComponent } from './componenti/user-manual/user-manual.component';
import { UserTaskCreationComponent } from './componenti/user-task-creation/user-task-creation.component';
import { UserRouteComponent } from './page/impostazioni-utente/impostazioni-utente.component';
import { NavbarComponent } from './componenti/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule,NavbarComponent,UserTaskCreationComponent, RouterOutlet, AdminvisuserComponent, AttivitaRecentiUtenteComponent, UserManualComponent, UserHomeComponent, AdminvisuserComponent]
})
export class AppComponent {
  title = 'ActivityTracker';
  showNavbar = signal<boolean>(true);

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNavbar.set(true)
        if(event.url.includes('/login') || event.url.includes('/registrati')) {
          this.showNavbar.set(false);
        }
      }
    });
  }

  
}

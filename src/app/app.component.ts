import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImpostaNuovaPasswordComponent } from './page/imposta-nuova-password/imposta-nuova-password.component';
import { UserHomeComponent } from './page/user-home/user-home.component';
import { AttivitaRecentiUtenteComponent } from './page/attivita-recenti-utente/attivita-recenti-utente/attivita-recenti-utente.component';
import { AdminvisuserComponent } from './page/admin-vis-users/admin-vis-users.component';
import { UserManualComponent } from './componenti/user-manual/user-manual.component';
import { UserTaskCreationComponent } from './componenti/user-task-creation/user-task-creation.component';
import { UserRouteComponent } from './page/impostazioni-utente/impostazioni-utente.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [UserTaskCreationComponent, RouterOutlet, AdminvisuserComponent, AttivitaRecentiUtenteComponent, UserManualComponent, UserHomeComponent, AdminvisuserComponent, UserRouteComponent]
})
export class AppComponent {
  title = 'ActivityTracker-FE';
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImpostaNuovaPasswordComponent } from './page/imposta-nuova-password/imposta-nuova-password.component';
import { UserHomeComponent } from './page/user-home/user-home.component';
import { AttivitaRecentiUtenteComponent } from './page/attivita-recenti-utente/attivita-recenti-utente/attivita-recenti-utente.component';
import { AdminvisuserComponent } from './page/admin-vis-users/admin-vis-users.component';
import { UserManualComponent } from './componenti/user-manual/user-manual.component';
import { navbarImpAdminComponent } from "./componenti/navbarimpadmin/navbarimpadmin.component";
import { NavbarimpostutenteComponent } from "./componenti/navbarimpostutente/navbarimpostutente.component";
import { NoDailyActivityComponent } from "./componenti/no-daily-activity/no-daily-activity.component";
import { NavbarComponent } from "./componenti/navbarutente/navbarutente.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, AdminvisuserComponent, AttivitaRecentiUtenteComponent, UserManualComponent, UserHomeComponent, AdminvisuserComponent, navbarImpAdminComponent, NavbarimpostutenteComponent, NoDailyActivityComponent, NavbarComponent]
})
export class AppComponent {
  title = 'ActivityTracker-FE';
}

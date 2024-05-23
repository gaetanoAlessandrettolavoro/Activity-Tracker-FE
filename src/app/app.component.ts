import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomePageComponent } from "./page/home-page/home-page.component";
import { AttivitaRecentiUtenteComponent } from "./page/attivita-recenti-utente/attivita-recenti-utente/attivita-recenti-utente.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HomePageComponent, AttivitaRecentiUtenteComponent]
})
export class AppComponent {
  title = 'ActivityTracker-FE';
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomePageComponent } from "./page/home-page/home-page.component";
import { NavbarimpostutenteComponent } from './componenti/navbarimpostutente/navbarimpostutente.component';
import { EmaildimenticataComponent } from './page/emaildimenticata/email-password-dimenticata/email-password-dimenticata.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HomePageComponent, NavbarimpostutenteComponent]

    imports: [RouterOutlet, HomePageComponent,EmaildimenticataComponent]
})
export class AppComponent {
  title = 'ActivityTracker-FE';
}

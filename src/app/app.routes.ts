import { Routes } from '@angular/router';
import { HomePageComponent } from './page/home-page/home-page.component';
import { AttivitaRecentiUtenteComponent } from './page/attivita-recenti-utente/attivita-recenti-utente/attivita-recenti-utente.component';

export const routes: Routes = [
    { path:'home', component:HomePageComponent },
    { path:'attivitaRecentiUtente',component:AttivitaRecentiUtenteComponent},
];

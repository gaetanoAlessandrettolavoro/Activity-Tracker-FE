import { Routes } from '@angular/router';
import { HomePageComponent } from './page/home-page/home-page.component';
import { AttivitaRecentiUtenteComponent } from './page/attivita-recenti-utente/attivita-recenti-utente/attivita-recenti-utente.component';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/page/register/register.component';
import { UserHomeComponent } from './page/user-home/user-home.component';

export const routes: Routes = [
    { path:'home', component:HomePageComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: "login", component:LoginComponent, pathMatch: 'full' },
    { path: "login/oggi", component:UserHomeComponent, pathMatch: 'full'},
    { path: "registrati", component: RegisterComponent, pathMatch: 'full'},
    { path:'attivitaRecentiUtente',component:AttivitaRecentiUtenteComponent},

];

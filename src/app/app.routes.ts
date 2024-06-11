import { Routes } from '@angular/router';
import { HomePageComponent } from './page/home-page/home-page.component';
import { AttivitaRecentiUtenteComponent } from './page/attivita-recenti-utente/attivita-recenti-utente/attivita-recenti-utente.component';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/page/register/register.component';
import { UserHomeComponent } from './page/user-home/user-home.component';
import { AdminVisUtenteSpecificoComponent } from './page/admin-vis-utente-specifico/admin-vis-utente-specifico.component';
import { EmaildimenticataComponent } from './page/emaildimenticata/email-password-dimenticata/email-password-dimenticata.component';
import { TutteAttivitaComponent } from './page/tutte-attivita/tutte-attivita.component';
import { AdminvisuserComponent } from './page/admin-vis-users/admin-vis-users.component';
import { ServiceloginService } from './servizi/servicelogin.service';
import { authGuard } from './guardie/auth.guard';
import { Router, CanActivateFn } from '@angular/router';



export const routes: Routes = [
    { path:'home', component:HomePageComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: "login", component:LoginComponent, pathMatch: 'full' },
    { path: "login/oggi", component:UserHomeComponent, pathMatch: 'full',canActivate: [authGuard]},
    { path: "registrati", component: RegisterComponent, pathMatch: 'full'},
    { path:'attivitarecentiutente',component:AttivitaRecentiUtenteComponent},
    { path:'admin-vis-utente-specifico/:id',component:AdminVisUtenteSpecificoComponent},
    { path:'emaildimenticata', component:EmaildimenticataComponent },
    { path:'tutteattivita', component:TutteAttivitaComponent},
    { path:'homeadmin', component:AdminvisuserComponent,canActivate: [authGuard] }

];


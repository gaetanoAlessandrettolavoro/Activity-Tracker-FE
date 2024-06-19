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
import { UserRouteComponent } from './page/impostazioni-utente/impostazioni-utente.component';
import { AdminrouteComponent } from './page/rotta-impostazioniadmin/rotta-impostazioniadmin.component';
import { authGuard } from './guardie/auth.guard';
import { AdminModeDatiUserSpeComponent } from './page/admin-mode-dati-user-spe/admin-mode-dati-user-spe.component';
import { NotFoundComponent } from './page/404/404.component';
import { authuserGuard } from './guardie/authuser.guard';
import { userGuard } from './guardie/user.guard';
import { homeGuard } from './guardie/home.guard';

export const routes: Routes = [
    { path: 'home', component: HomePageComponent,canActivate: [homeGuard,userGuard] },
    { path: 'login', component: LoginComponent,canActivate: [homeGuard,userGuard] },
    { path: 'registrati', component: RegisterComponent,canActivate: [homeGuard,userGuard] },
    { path: 'attivitaprecedentiutente', component: AttivitaRecentiUtenteComponent,canActivate:[authuserGuard] },
    { path: 'admin-vis-utente-specifico/:id', component: AdminVisUtenteSpecificoComponent, canActivate: [authGuard] },
    { path: 'passworddimenticata', component: EmaildimenticataComponent },
    { path: 'tutteattivita', component: TutteAttivitaComponent, canActivate: [authGuard] },
    { path: 'homeadmin', component: AdminvisuserComponent, canActivate: [authGuard] },
    { path: 'impostazioniutente', component: UserRouteComponent,canActivate:[authuserGuard] },
    { path: 'impostazioniadmin', component: AdminrouteComponent, canActivate: [authGuard] },
    { path: 'userhome', component: UserHomeComponent,canActivate:[authuserGuard] },
    { path: 'admin-mode-dati-user-spe', component: AdminModeDatiUserSpeComponent, canActivate:[authGuard] },


    // Questa rotta deve restare per ultima 
    { path:'**',component: NotFoundComponent }
];

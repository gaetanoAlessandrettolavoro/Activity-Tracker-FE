import { Routes } from '@angular/router';
import { HomePageComponent } from './page/home-page/home-page.component';
import { AttivitaRecentiUtenteComponent } from './page/attivita-recenti-utente/attivita-recenti-utente/attivita-recenti-utente.component';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { UserHomeComponent } from './page/user-home/user-home.component';
import { AdminVisUtenteSpecificoComponent } from './page/admin-vis-utente-specifico/admin-vis-utente-specifico.component';
import { EmaildimenticataComponent } from './page/emaildimenticata/email-password-dimenticata/email-password-dimenticata.component';
import { TutteAttivitaComponent } from './page/tutte-attivita/tutte-attivita.component';
import { AdminvisuserComponent } from './page/admin-vis-users/admin-vis-users.component';
import { UserRouteComponent } from './page/impostazioni-utente/impostazioni-utente.component';
import { authGuard } from './guardie/auth.guard';
import { AdminModeDatiUserSpeComponent } from './page/admin-mode-dati-user-spe/admin-mode-dati-user-spe.component';
import { NotFoundComponent } from './page/404/404.component';
import { authuserGuard } from './guardie/authuser.guard';
import { userGuard } from './guardie/user.guard';
import { homeGuard } from './guardie/home.guard';
import { GraficiComponent } from './page/grafici/grafici.component';
import { ImpostaNuovaPasswordComponent } from './page/imposta-nuova-password/imposta-nuova-password.component';
import { NewpasswordComponent } from './page/newpassword/newpassword.component';
import { bothRolesGuard } from './guardie/bothRoles.guard';

export const routes: Routes = [
    { path: 'home', component: HomePageComponent,canActivate: [homeGuard,userGuard] },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent,canActivate: [homeGuard,userGuard] },
    { path: 'registrati', component: RegisterComponent,canActivate: [homeGuard,userGuard] },
    { path: 'attivitaprecedentiutente', component: AttivitaRecentiUtenteComponent,canActivate:[authuserGuard] },
    { path: 'admin-vis-utente-specifico/:id', component: AdminVisUtenteSpecificoComponent, canActivate: [authGuard] },
    { path: 'passworddimenticata', component: EmaildimenticataComponent },
    { path: 'tutteattivita', component: TutteAttivitaComponent, canActivate: [authGuard] },
    { path: 'homeadmin', component: AdminvisuserComponent, canActivate: [authGuard] },
    { path: 'impostazioni', component: UserRouteComponent,canActivate:[bothRolesGuard] },
    { path: 'userhome', component: UserHomeComponent,canActivate:[authuserGuard] },
    { path: 'utenti/:id', component: AdminModeDatiUserSpeComponent, canActivate:[authGuard] },
    { path: 'grafici', component: GraficiComponent, canActivate:[authGuard] },
    { path: 'cambio-password', component: ImpostaNuovaPasswordComponent, canActivate:[bothRolesGuard] },
    { path:'resetPassword/:id', component:NewpasswordComponent},


    // Questa rotta deve restare per ultima 
    { path:'**',component: NotFoundComponent }
];

import { Routes } from '@angular/router';
import { HomePageComponent } from './page/home-page/home-page.component';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/page/register/register.component';

export const routes: Routes = [
    { path:'home', component:HomePageComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: "login", component:LoginComponent, pathMatch: 'full' },
    { path: "registrati", component: RegisterComponent, pathMatch: 'full'}
];

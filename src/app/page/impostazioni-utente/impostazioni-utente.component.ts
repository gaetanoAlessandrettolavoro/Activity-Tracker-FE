import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavbarimpostutenteComponent } from '../../componenti/navbarimpostutente/navbarimpostutente.component';

@Component({
  selector: 'app-impostazioniutente',
  templateUrl: './impostazioni-utente.component.html',
  styleUrls: ['./impostazioni-utente.component.css'],
  standalone: true,
  imports:[RouterLink,NavbarimpostutenteComponent]
})
export class UserRouteComponent {
goBack() {
throw new Error('Method not implemented.');
}
  admin: any = {};

  constructor(private router: Router) {}

  CambiaPassword() {
    console.log("Cambiapassword");
  }

  goToHome() {
    this.router.navigate(['/']); 
  }
}

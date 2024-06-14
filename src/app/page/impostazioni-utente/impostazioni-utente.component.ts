import { Component } from '@angular/core';
import { NavbarimpostutenteComponent } from '../../componenti/navbarimpostutente/navbarimpostutente.component';

@Component({
  selector: 'app-impostazioniutente',
  templateUrl: './impostazioni-utente.component.html',
  styleUrls: ['./impostazioni-utente.component.css'],
  standalone: true,
  imports: [NavbarimpostutenteComponent]
})
export class UserRouteComponent {
  admin: any = {}; 

  constructor() {}

  CambiaPassword() {
    console.log("Cambiapassword");
  }
}
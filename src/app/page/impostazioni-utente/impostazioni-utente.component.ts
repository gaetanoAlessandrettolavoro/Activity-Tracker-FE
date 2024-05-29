import { Component } from '@angular/core';

@Component({
  selector: 'app-impostazioniutente',
  templateUrl: './impostazioni-utente.component.html',
  styleUrls: ['./impostazioni-utente.component.css'],
  standalone: true
})
export class UserRouteComponent {
  admin: any = {}; 

  constructor() {}

  CambiaPassword() {
    console.log("Cambiapassword");
  }
}
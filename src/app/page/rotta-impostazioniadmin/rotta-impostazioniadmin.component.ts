import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-impostazioniadmin',
  templateUrl: './rotta-impostazioniadmin.component.html',
  styleUrls: ['./rotta-impostazioniadmin.component.css'],
  standalone: true,
  imports:[RouterLink]
})
export class AdminrouteComponent {
CambioPassword() {
throw new Error('Method not implemented.');
}
  admin: any = {}; 
  
  resetForm() {
    console.log("Annulla le modifiche");
    this.admin = {}; 
  }

  editForm() {
    console.log("Modifica");
  }

  saveForm() {
    console.log("Salva");
    console.log(this.admin); 
  }
}
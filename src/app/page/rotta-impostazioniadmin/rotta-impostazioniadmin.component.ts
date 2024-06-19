import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { navbarImpAdminComponent } from "../../componenti/navbarimpadmin/navbarimpadmin.component";


@Component({
    selector: 'app-impostazioniadmin',
    templateUrl: './rotta-impostazioniadmin.component.html',
    styleUrls: ['./rotta-impostazioniadmin.component.css'],
    standalone: true,
    imports: [RouterLink, navbarImpAdminComponent]
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
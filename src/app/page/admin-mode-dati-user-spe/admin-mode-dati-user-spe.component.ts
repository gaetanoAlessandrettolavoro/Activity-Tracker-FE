import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-mode-dati-user-spe',
  standalone: true,
  imports: [],
  templateUrl: './admin-mode-dati-user-spe.component.html',
  styleUrl: './admin-mode-dati-user-spe.component.css'
})
export class AdminModeDatiUserSpeComponent {
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

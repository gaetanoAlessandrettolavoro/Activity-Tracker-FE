import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { UserServiceService } from '../../../servizi/user-service.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-emaildimenticata',
  standalone: true,
  imports: [InputTextModule,FormsModule, ToastModule],
  templateUrl: './email-password-dimenticata.component.html',
  styleUrl: './email-password-dimenticata.component.css',
  providers: [MessageService]
})
export class EmaildimenticataComponent {

  constructor(private userService: UserServiceService, private messageService: MessageService){}

  showError(statusCode: number) {
    switch (statusCode) {
      case 403: 
        this.messageService.add({
          severity: 'error',
          summary: 'Errore 403',
          detail: 'L\'utente non è attivo o non è stato accettato, per favore contatta l\'amministratore.',
        });
        break;
      case 404:
        this.messageService.add({
          severity: 'error',
          summary: 'Errore 404',
          detail: 'Nessun utente trovato con queste credenziali, per favore registrati.',
        });
        break;
      case 429:
        this.messageService.add({
          severity: 'error',
          summary: 'Errore 429',
          detail: 'Troppi tentativi di accesso, riprova più tardi.',
        });
        break;
      case 500:
        this.messageService.add({
          severity: 'error',
          summary: 'Errore 500',
          detail: 'Errore interno del server, riprova più tardi.',
        });
        break;
    }
  }
   

value: any;
userForm: any;
  email: string = '';

  submit() {
    this.userService.forgotPassword(this.email).subscribe({
      next: (result: any) => {
        console.log(result)
      },
      error: (error: any) => {
        this.showError(error.status);
      }
    });
  }
  
}


import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { UserServiceService } from '../../../servizi/user-service.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ErrorServiziService } from '../../../servizi/error-servizi.service';
import { Router } from '@angular/router';
import { LoggingService } from '../../../servizi/logging.service';

@Component({
  selector: 'app-emaildimenticata',
  standalone: true,
  imports: [InputTextModule, FormsModule, ToastModule],
  templateUrl: './email-password-dimenticata.component.html',
  styleUrls: ['./email-password-dimenticata.component.css'],
  providers: [MessageService]
})
export class EmaildimenticataComponent {

  constructor(
    private userService: UserServiceService,
    private messageService: MessageService,
    private errors: ErrorServiziService,
    private router: Router,
    private logging: LoggingService 
  ) {}

  showError(statusCode: number) {
    if (statusCode === 403) {
      this.messageService.add({
        severity: 'error',
        summary: 'Errore 403',
        detail: 'L\'utente non è attivo o non è stato accettato, per favore contatta l\'amministratore.',
      });
      this.logging.error('Errore 403: L\'utente non è attivo o non è stato accettato');
    } else if (statusCode === 429) {
      this.messageService.add(this.errors.getErrorMessage(statusCode));
      setTimeout(() => {
        this.userService.logout();
        this.router.navigate(['/login']);
      }, 3000);
      this.logging.error(`Errore 429: ${this.errors.getErrorMessage(statusCode)}`);
    } else {
      this.messageService.add(this.errors.getErrorMessage(statusCode));
      this.logging.error(`Errore: ${this.errors.getErrorMessage(statusCode)}`);
    }
  }

  email: string = '';

  submit() {
    this.userService.forgotPassword(this.email).subscribe({
      next: (result: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Un\'email per il reset della password è stata mandata'
        });
        this.logging.log('Richiesta di reset della password inviata con successo');
      },
      error: (error: any) => {
        this.showError(error.status);
        this.logging.error(`Errore durante la richiesta di reset della password: ${error.message}`);
      }
    });
  }
}

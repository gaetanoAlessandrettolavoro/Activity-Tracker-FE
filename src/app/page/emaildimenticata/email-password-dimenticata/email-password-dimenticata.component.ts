import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { UserServiceService } from '../../../servizi/user-service.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ErrorServiziService } from '../../../servizi/error-servizi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emaildimenticata',
  standalone: true,
  imports: [InputTextModule,FormsModule, ToastModule],
  templateUrl: './email-password-dimenticata.component.html',
  styleUrl: './email-password-dimenticata.component.css',
  providers: [MessageService]
})
export class EmaildimenticataComponent {

  constructor(private userService: UserServiceService, private messageService: MessageService, private errors: ErrorServiziService, private router: Router){}

  showError(statusCode: number) {
    if(statusCode === 403) {
      this.messageService.add({
        severity: 'error',
        summary: 'Errore 403',
        detail: 'L\'utente non è attivo o non è stato accettato, per favore contatta l\'amministratore.',
      });
    } else if(statusCode === 429) {
      this.messageService.add(this.errors.getErrorMessage(statusCode));
      setTimeout(() => {
        this.userService.logout();
        this.router.navigate(['/login']);
      }, 3000);
    } else {
      this.messageService.add(this.errors.getErrorMessage(statusCode));
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


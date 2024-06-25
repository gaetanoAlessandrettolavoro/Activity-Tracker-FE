import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from '../../servizi/user-service.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-imposta-nuova-password',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    PasswordModule,
    RouterLink,
    ButtonModule,
    RippleModule,
    ToastModule
  ],
  templateUrl: './imposta-nuova-password.component.html',
  styleUrls: ['./imposta-nuova-password.component.css'], // Corrected the property name from styleUrl to styleUrls
  providers: [MessageService],
})
export class ImpostaNuovaPasswordComponent {

  constructor(private router: Router, private userService: UserServiceService, private messageService: MessageService) { }

  showError(statusCode: number) {
    switch (statusCode) {
      case 1:
        this.messageService.add({
          severity: 'error',
          summary: 'Errore 1',
          detail: 'Form non valido, riprova.',
        });
        break;
      case 400: 
        this.messageService.add({
          severity: 'error',
          summary: 'Errore 400',
          detail: 'Errore durante la richiesta, riprova più tardi.',
        });
        break;
      case 401:
        this.messageService.add({
          severity: 'error',
          summary: 'Errore 401',
          detail: 'Sembra che tu non sia autenticato. Accedi per continuare.',
        });
        setTimeout(() => {
          this.userService.logout();
          this.router.navigate(['/login']);
        }, 3000);
        break;
      case 429:
        this.messageService.add({
          severity: 'error',
          summary: 'Errore 429',
          detail: 'Troppi tentativi di accesso, riprova tra un\'ora.',
        });
        setTimeout(() => {
          this.userService.logout();
          this.router.navigate(['/login']);
        }, 3000);
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

  userForm = new FormGroup({
    oldPassword: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });
  
  onSubmit() {
    if (this.userForm.valid) {
      this.userService.updatePassword({
        passwordCurrent: this.userForm.value.oldPassword,
        password: this.userForm.value.password,
        passwordConfirm: this.userForm.value.confirmPassword
      }).subscribe({
        next: (result: any) => {
          console.log(result);
        },
        error: (error: any) => {
          console.error('Si è verificato un errore:', error);
        }
      });
    } else {
      this.showError(1);
    }
  }
}
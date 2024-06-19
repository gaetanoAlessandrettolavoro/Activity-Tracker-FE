import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ServiceloginService } from '../../servizi/servicelogin.service';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    RippleModule,
    CommonModule,
    ToastModule,
    ButtonModule,
    RippleModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
})
export class LoginComponent {
  userForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private router: Router,
    private servizio: ServiceloginService,
    private messageService: MessageService
  ) {}

  visible: boolean = false;

  countersubmit: number = 0;

  onSubmit() {
    if (this.userForm.valid) {
      const postData = {
        email: this.userForm.value.username ?? '',
        password: this.userForm.value.password ?? '',
      };

      this.servizio.login(postData).subscribe({
        next: (result: any) => {
          this.servizio.setUser(result.data);
          if(result.data.role == "user"){
            this.router.navigate(["/userhome"])
          }
          if(result.data.role == "admin"){
            this.router.navigate(["/homeadmin"])
          }
        },
        error: (err) => {
          console.error('Login failed', err);
          if (err.status === 401) {
            let numberValue = parseInt(
              localStorage.getItem('submit') ?? '0',
              10
            );

            if (numberValue < 4) {
              numberValue++; // Incrementa il contatore di tentativi
              localStorage.setItem('submit', numberValue.toString());
            }

            if (numberValue < 4) {
              this.show();
            }
          }
        },
      });
    } else {
      console.log('Form not valid');
    }
  }

  navigateForgotPassword() {
    this.router.navigate(['emaildimenticata']);
  }

  navigateToRegister() {
    this.router.navigate(['registrati']);
  }

  navigateToHome() {
    this.router.navigate(['home']);
  }

  show() {
    this.messageService.add({
      severity: 'error',
      summary: 'Errore 401',
      detail: 'Verifica la tua email e la tua password e riprova.',
    });
  }

  onInputEmail(event: Event): void {
    localStorage.removeItem('submit');
  }

  onInputPassword(event: Event): void {
    localStorage.removeItem('submit');
  }
}

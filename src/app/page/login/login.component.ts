import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { UserServiceService } from '../../servizi/user-service.service';
import { ErrorServiziService } from '../../servizi/error-servizi.service';

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
    RouterLink
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
    private messageService: MessageService,
    private userService: UserServiceService,
    private errors: ErrorServiziService
  ) {}

  visible: boolean = false;

  countersubmit: number = 0;

  onSubmit() {
    if (this.userForm.valid) {
      const postData = {
        email: this.userForm.value.username ?? '',
        password: this.userForm.value.password ?? '',
      };

      this.userService.login(postData).subscribe({
        next: (result: any) => {
          this.userService.getRole(result.data);
          if(result.data.role == "user"){
            this.router.navigate(["/dash-user"])
          }
          if(result.data.role == "admin"){
            this.router.navigate(["/dash-admin"])
          }
        },
        error: (err) => {
            let numberValue = parseInt(
              localStorage.getItem('submit') ?? '0',
              10
            );

            if (numberValue < 4) {
              numberValue++; // Incrementa il contatore di tentativi
              localStorage.setItem('submit', numberValue.toString());
            }

            if(numberValue == 4){
              setTimeout(() => {
                localStorage.removeItem('submit');
              }, 5000);
            }

            if (numberValue < 4) {
              this.showError(err.status);
            }
          }
      });
    } else {
      this.showError(400);
    }
  }

  navigateToRegister() {
    this.router.navigate(['registrati']);
  }

  navigateToHome() {
    this.router.navigate(['home']);
  }

  showError(statusCode: number) {
    if(statusCode === 401) {
      this.messageService.add({...this.errors.getErrorMessage(statusCode), detail: 'Verifica la tua email e la tua password e riprova.'});
    } else if(statusCode === 400) {
      this.messageService.add({...this.errors.getErrorMessage(statusCode), detail: 'Per favore inserisci un\' email e una password'});
    } else if (statusCode === 429) {
      this.messageService.add(this.errors.getErrorMessage(statusCode));
        setTimeout(() => {
          this.userService.logout();
          this.router.navigate(['/login']);
        }, 3000);
    } else {
      this.messageService.add(this.errors.getErrorMessage(statusCode));
    }
  }

  onInputEmail(event: Event): void {
    localStorage.removeItem('submit');
  }

  onInputPassword(event: Event): void {
    localStorage.removeItem('submit');
  }
}

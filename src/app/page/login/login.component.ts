import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ServiceloginService } from '../../servizi/servicelogin.service';

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
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(private router: Router, private servizio: ServiceloginService) { }

  onSubmit() {
    if (this.userForm.valid) {
      const postData = {
        email: this.userForm.value.username ?? '', 
        password: this.userForm.value.password ?? '',
      };

      this.servizio.login(postData).subscribe({
        next: (result: any) => {
          this.servizio.setUser(result.data);
          if (this.servizio.isAdmin()) {
            this.router.navigate(['/homeadmin']);
          } else {
            this.router.navigate(['/home']);
          }
        },
        error: (err) => {
          console.error('Login failed', err);
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
}

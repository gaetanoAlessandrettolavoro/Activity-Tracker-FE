import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

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
  styleUrl: './login.component.css',
})
export class LoginComponent {

  constructor(private router: Router) { }

  userForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  
  onSubmit() {
    if(this.userForm.valid) {
      console.log(this.userForm.value);
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

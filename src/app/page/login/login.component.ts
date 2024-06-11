import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ServiceloginService } from '../../servizi/servicelogin.service';
import { User } from '../../model/userModel';

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

  constructor(private router: Router,@Inject(ServiceloginService) private servizio: ServiceloginService) { }

  userForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  
  onSubmit() {
    if (
      !this.userForm.value.username ||
      !this.userForm.value.password
    ) {
      console.error('Error!');
    } else if (this.userForm.valid) {
      console.log('Form Submitted!', this.userForm.value);
      const postData  = {
        email: this.userForm.value.username,
        password: this.userForm.value.password,
      };
      this.servizio
        .getUser(postData)
        .subscribe({ next: (result: any) => { 
           this.servizio.checkAuthentication(result.data.role)
           this.router.navigate(['/homeadmin']);
        }
         
          });
         
      console.log(postData);
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

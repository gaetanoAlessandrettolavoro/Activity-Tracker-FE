import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from '../../servizi/user-service.service';

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
  ],
  templateUrl: './imposta-nuova-password.component.html',
  styleUrls: ['./imposta-nuova-password.component.css'] // Corrected the property name from styleUrl to styleUrls
})
export class ImpostaNuovaPasswordComponent {

  constructor(private router: ActivatedRoute, private userService: UserServiceService) { }

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
    }
  }
}
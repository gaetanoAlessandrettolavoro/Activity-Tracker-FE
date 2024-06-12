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

  constructor(private router: ActivatedRoute, private http: HttpClient) { }

  userForm = new FormGroup({
    oldPassword: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });
  
  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
    }
    this.getToken()
  }

  getToken() {
    this.router.params.subscribe(params => {
      this.newPassword().subscribe({
        next: (result: any) => {
          console.log(result);
        },
        error: (error: any) => {
          console.error('Si è verificato un errore:', error);
        }
      });
    });
  }

  newPassword(): Observable<any> {
    return this.http.patch<any>(
      'http://localhost:3000/api/v1/users/updateMyPassword',
      {
        passwordCurrent: this.userForm.value.oldPassword,
        password: this.userForm.value.password,
        passwordConfirm: this.userForm.value.confirmPassword
      },
      { withCredentials: true } // Corrected the position of withCredentials
    );
  }
}
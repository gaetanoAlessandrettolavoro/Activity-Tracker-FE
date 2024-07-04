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
import { ErrorServiziService } from '../../servizi/error-servizi.service';

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
  userForm = new FormGroup({
    oldPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });

  constructor(
    private router: Router,
    private userService: UserServiceService,
    private messageService: MessageService,
    private errors: ErrorServiziService
  ) {}

  showError(statusCode: number) {
    if (statusCode === 401 || statusCode === 429) {
      this.messageService.add(this.errors.getErrorMessage(statusCode));
      setTimeout(() => {
        this.userService.logout();
        this.router.navigate(['/login']);
      }, 3000);
    } else if(statusCode === 400) {
      this.messageService.add({...this.errors.getErrorMessage(statusCode), detail: 'Le password non corrispondono'});
    } else {
      this.messageService.add(this.errors.getErrorMessage(statusCode));
    }
  }

  chiudi() {
    this.router.navigate(['/impostazioni']);
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.userService.updatePassword({
        passwordCurrent: this.userForm.value.oldPassword,
        password: this.userForm.value.newPassword,
        passwordConfirm: this.userForm.value.confirmPassword,
      }).subscribe({
        next: (result: any) => {
          this.showError(250);
          setTimeout(() => {
            this.router.navigate(['/impostazioni']);
          }, 1000);
        },
        error: (error: any) => {
          this.showError(error.status);
        },
      });
    } else {
      this.showError(1);
    }
  }
}

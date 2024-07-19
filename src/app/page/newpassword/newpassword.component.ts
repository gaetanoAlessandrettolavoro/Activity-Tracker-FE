import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { UserServiceService } from '../../servizi/user-service.service';
import { ErrorServiziService } from '../../servizi/error-servizi.service';
import { LoggingService } from '../../servizi/logging.service';

@Component({
  selector: 'app-newpassword',
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
    ToastModule
  ],
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css'],
  providers: [MessageService],
})
export class NewpasswordComponent {

  constructor(
    private route: ActivatedRoute,
    private userService: UserServiceService,
    private messageService: MessageService,
    private errors: ErrorServiziService,
    private router: Router,
    private loggingService: LoggingService
  ) {}

  showError(statusCode: number, mess?: string) {
    if (statusCode === 401 || statusCode === 429) {
      this.messageService.add(this.errors.getErrorMessage(statusCode));
      setTimeout(() => {
        this.userService.logout();
        this.router.navigate(['/login']);
      }, 3000);
    } else if (statusCode === 400) {
      if (mess !== "Token is invalid or expired") {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'La password non rispetta i criteri previsti' });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Link non valido' });
      }
    } else {
      this.messageService.add(this.errors.getErrorMessage(statusCode));
    }
    this.loggingService.error(`Error ${statusCode}: ${mess || ''}`);
  }

  userForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    passwordc: new FormControl('', [Validators.required])
  });

  passwordnonuguali = false;
  submit = false;
  campovuoto = false;

  onSubmit() {
    if (this.userForm.value.password !== this.userForm.value.passwordc && this.userForm.value.passwordc !== "") {
      this.passwordnonuguali = true;
      this.submit = false;
      this.campovuoto = false;
    } else if (this.userForm.value.password === "" || this.userForm.value.passwordc === "") {
      this.passwordnonuguali = false;
      this.submit = false;
      this.campovuoto = true;
    } else if (this.userForm.valid) {
      this.loggingService.log('Form Submitted!');
      const postData = {
        password: this.userForm.value.password,
        passwordc: this.userForm.value.passwordc,
      };
      this.loggingService.log(`Post Data: ${JSON.stringify(postData)}`);
      this.getToken();
      this.passwordnonuguali = false;
      this.campovuoto = false;
    } else {
      this.showError(1);
    }
  }

  getToken() {
    this.route.params.subscribe(params => {
      const token = params['id'];
      this.loggingService.log(`Token: ${token}`);
      this.userService.resetPassword(token, {
        password: this.userForm.value.password,
        passwordConfirm: this.userForm.value.passwordc
      }).subscribe({
        next: (result: any) => {
          if (result.status === 'success') {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Password modificata con successo. Ti reindirizzeremo al login'
            });
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
          }
          this.loggingService.log(`Result: ${JSON.stringify(result)}`);
        },
        error: (error: any) => {
          this.loggingService.error(`Error: ${JSON.stringify(error)}`);
          this.showError(error.status, error.error.message);
        }
      });
    });
  }
}

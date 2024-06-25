import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { Observable } from 'rxjs';
import { UserServiceService } from '../../servizi/user-service.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

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
  styleUrl: './newpassword.component.css',
providers: [MessageService],
})
export class NewpasswordComponent {

  constructor(private route: ActivatedRoute, private userService: UserServiceService, private messageService: MessageService) {}

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
      case 404:
        this.messageService.add({
          severity: 'error',
          summary: 'Errore 404',
          detail: 'Nessun utente trovato con quest\'email, per favore registrati.',
        });
        break;
      case 429:
        this.messageService.add({
          severity: 'error',
          summary: 'Errore 429',
          detail: 'Troppi tentativi di accesso, riprova più tardi.',
        });
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
    password: new FormControl('', [Validators.required]),
    passwordc: new FormControl('', [Validators.required])
  });

  passwordnonuguali = false;
  submit = false;
  campovuoto = false;

  onSubmit() {
    if (this.userForm.value.password != this.userForm.value.passwordc && this.userForm.value.passwordc != "") {
      this.passwordnonuguali = true;
      this.submit = false;
      this.campovuoto = false;
    } else if (this.userForm.value.password == "" || this.userForm.value.passwordc == "") {
      this.passwordnonuguali = false;
      this.submit = false;
      this.campovuoto = true;
    } else if (this.userForm.valid) {
      console.log('Form Submitted!', this.userForm.value);
      const postData = {
        password: this.userForm.value.password,
        passwordc: this.userForm.value.passwordc,
      };
      console.log(postData);
      this.getToken()
      this.passwordnonuguali = false;
      this.submit = true;
      this.campovuoto = false;
    } else {
      this.showError(1);
    }
  }


  getToken() {
    this.route.params.subscribe(params => {
      const token = params['id'];
      console.log(token)
    this.userService.resetPassword(token, { password: this.userForm.value.password,passwordConfirm: this.userForm.value.passwordc }).subscribe({
      next: (result: any) => {
        console.log("ciao");
      },
      error: (error: any) => {
        this.showError(error.status);
     }
    })
    });
  }

}  


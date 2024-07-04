import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { Observable } from 'rxjs';
import { UserServiceService } from '../../servizi/user-service.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ErrorServiziService } from '../../servizi/error-servizi.service';

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

  constructor(private route: ActivatedRoute, private userService: UserServiceService, private messageService: MessageService, private errors: ErrorServiziService, private router: Router) {}

  showError(statusCode: number, mess?: string) {
    if(statusCode === 401 || statusCode === 429) {
      this.messageService.add(this.errors.getErrorMessage(statusCode));
      setTimeout(() => {
        this.userService.logout();
        this.router.navigate(['/login']);
      }, 3000);
    } else if(statusCode === 400) {
      if(mess) {
        this.messageService.add({severity:'error', summary:'Error', detail:'Il token è scaduto o non è valido. Contatta l\'amministratore'});
      } else {
        this.messageService.add({severity:'error', summary:'Error', detail:'La password non rispetta i criteri previsti'});
      }
    } else {
      this.messageService.add(this.errors.getErrorMessage(statusCode));
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
        this.messageService.add({severity:'success', summary:'Success', detail: 'Password modificata con successo. Ti reindirizzeremo al login'});
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error: any) => {
        console.error(error)
        this.showError(error.status, error.message);
     }
    })
    });
  }

}  



import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-featnewpassword',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    RippleModule,
    CommonModule
  ],
  templateUrl: './featnewpassword.component.html',
  styleUrl: './featnewpassword.component.css'
})
export class FeatnewpasswordComponent {

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

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
      console.log('Form not valid');
    }
  }


  getToken() {
    this.route.params.subscribe(params => {
      const token = params['id'];
      console.log(token)
    this.newPassword(token).subscribe({
      next: (result: any) => {
        console.log("ciao");
      },
      error: (error: any) => {
        console.error('Si è verificato un errore:', error);
     } })
    });
  }

  
  newPassword(data: any): Observable<any> {
    return this.http.patch<any>(`http://localhost:3000/api/v1/users/resetPassword/${data}`, { password: this.userForm.value.password,passwordConfirm: this.userForm.value.passwordc });
  }
}  
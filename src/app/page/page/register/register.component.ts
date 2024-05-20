import { Component,ElementRef,OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'register',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule,MessagesModule,CommonModule,PasswordModule,FormsModule,CheckboxModule,FileUploadModule,ToastModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[MessageService]

  
})
export class RegisterComponent  {


  title = 'ActivityTracker-FE';

  constructor(private messageService: MessageService) {}

    show() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
    }


  

  formSubmitted: boolean = false;
  value!: string;
  checked: boolean = false;
  Validform: boolean = false

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('pswd');
    const confirmPassword = control.get('pswdc');

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value !== confirmPassword.value ? { 'passwordMismatch': true } : null;
  };

  userForm = new FormGroup({
    img: new FormControl(""),
    name: new FormControl("", [
      Validators.required,
      Validators.pattern(/^[A-Za-z]+$/),
    ]),
    surname: new FormControl("", [
      Validators.required,
      Validators.pattern(/^[A-Za-z]+$/),
    ]),
    TaxIDcode:new FormControl("",[Validators.required, Validators.pattern(/^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$/)]),
    email: new FormControl("", [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$")]),
      pswd: new FormControl("", [Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$")]),
      pswdc: new FormControl("", Validators.required)
  }, { validators: this.passwordMatchValidator });

  @ViewChild('passwordInput', { static: true }) passwordInput!: ElementRef;
  @ViewChild('confirmPasswordInput', { static: true }) confirmPasswordInput!: ElementRef;


  togglePasswordVisibility(): void {

    const passwordInputType = this.passwordInput.nativeElement.type;
    const newType = passwordInputType === 'password' ? 'text' : 'password';

    this.passwordInput.nativeElement.type = newType;
    this.confirmPasswordInput.nativeElement.type = newType;
    
  }
  addSingle() {
    this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
}

  
  onSubmit() {
    this.formSubmitted = true;
    if (this.userForm.valid) {
      console.log('Form Submitted!', this.userForm.value);
      this.Validform = true
    } else {
      console.log('Form not valid');
    }
  }

  messages: any

    
}

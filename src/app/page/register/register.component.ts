import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { User } from '../../models/userModel';
import { HttpClientModule } from '@angular/common/http';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { UserServiceService } from '../../servizi/user-service.service';
import { ErrorServiziService } from '../../servizi/error-servizi.service';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'register',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    MessagesModule,
    CommonModule,
    PasswordModule,
    FormsModule,
    CheckboxModule,
    FileUploadModule,
    ToastModule,
    DialogModule,
    ProgressSpinnerModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService, HttpClientModule],
})
export class RegisterComponent {
  showSuccessMessage: boolean = false;
  formSubmitted: boolean = false;
  visible: boolean = false;
  Validform: boolean = false;

  userForm = new FormGroup({
    img: new FormControl(''),
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-z]+$/),
    ]),
    surname: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-z]+$/),
    ]),
    TaxIDcode: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?:[A-Z][AEIOU][AEIOUX]|[AEIOU]X{2}|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}(?:[\\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[15MR][\\dLMNP-V]|[26NS][0-8LMNP-U])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM]|[AC-EHLMPR-T][26NS][9V])|(?:[02468LNQSU][048LQU]|[13579MPRTV][26NS])B[26NS][9V])(?:[A-MZ][1-9MNP-V][\\dLMNP-V]{2}|[A-M][0L](?:[1-9MNP-V][\\dLMNP-V]|[0L][1-9MNP-V]))[A-Z]$'
      ),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$'),
    ]),
  });

  constructor(
    private messageService: MessageService,
    private router: Router,
    @Inject(UserServiceService) private userService: UserServiceService,
    private errors: ErrorServiziService
  ) {}

  showError(statusCode: number) {
    switch (statusCode) {
      case 1:
        this.messageService.add(this.errors.getErrorMessage(1));
        break;
      case 400:
        this.messageService.add(this.errors.getErrorMessage(400));
        break;
      case 429:
        this.messageService.add(this.errors.getErrorMessage(429));
        setTimeout(() => {
          this.userService.logout();
          this.router.navigate(['/login']);
        }, 3000);
        break;
      case 500:
        this.messageService.add(this.errors.getErrorMessage(500));
        break;
    }
  }

  onSubmit() {
    if (
      !this.userForm.value.name ||
      !this.userForm.value.surname ||
      !this.userForm.value.TaxIDcode ||
      !this.userForm.value.email
    ) {
      this.showError(1);
    } else if (this.userForm.valid) {
      console.log('Form Submitted!', this.userForm.value);
      this.Validform = true;
      const postData: User = {
        firstName: this.userForm.value.name,
        lastName: this.userForm.value.surname,
        email: this.userForm.value.email,
        codiceFiscale: this.userForm.value.TaxIDcode,
      };

      this.userService.register(postData).subscribe({
        next: (result: any) => {
          console.log(result);
          this.formSubmitted = true;
          if (!this.showSuccessMessage) {
            this.showSuccessMessage = true;
            this.visible = true; // Mostra il modale solo la prima volta che il form viene inviato con successo
          }
        },
        error: (error) => {
          this.showError(error.status);
        },
      });
      console.log(postData);
    } else {
      console.log('Form not valid');
    }
  }

  navigateToHome() {
    this.router.navigate(['home']);
  }
}

import {
  Component,
  Inject,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
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
import { LoggingService } from '../../servizi/logging.service';
import { ModaleImpostazioniInquadramentoComponent } from "../../componenti/modale-impostazioni-inquadramento/modale-impostazioni-inquadramento.component";
import { ModaleImpostazioniQualificaComponent } from "../../componenti/modale-impostazioni-qualifica/modale-impostazioni-qualifica.component";


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
    ProgressSpinnerModule,
    RouterLink,
    ModaleImpostazioniInquadramentoComponent,
    ModaleImpostazioniQualificaComponent
],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService, HttpClientModule],
})
export class RegisterComponent {
user = signal<User>({} as User);
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
    position: new  FormControl(this.user().position),
    qualification: new FormControl(this.user().qualification),

  });

  constructor(
    private messageService: MessageService,
    private router: Router,
    @Inject(UserServiceService) private userService: UserServiceService,
    private errors: ErrorServiziService,
    private loggingService: LoggingService
  ) {}

  showError(statusCode: number) {
    if (statusCode === 401 || statusCode === 429) {
      this.messageService.add(this.errors.getErrorMessage(statusCode));
      setTimeout(() => {
        this.userService.logout();
        this.router.navigate(['/login']);
      }, 3000);
    } else if (statusCode === 400) {
      this.messageService.add({ ...this.errors.getErrorMessage(statusCode), detail: 'L\'email o il codice fiscale risultano essere già inseriti. Se così non fosse contatta l\'amministratore' });
    } else {
      this.messageService.add(this.errors.getErrorMessage(statusCode));
    }
    this.loggingService.error(`Error ${statusCode}`);
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
      this.loggingService.log('Form Submitted!');
      //CALOGERO, ERIKA toglietelo poi sto ignore
      //@ts-ignore
      const postData: User = {
        firstName: this.userForm.value.name,
        lastName: this.userForm.value.surname,
        email: this.userForm.value.email,
        codiceFiscale: this.userForm.value.TaxIDcode,
      };

      this.userService.register(postData).subscribe({
        next: (result: any) => {
          this.loggingService.log(`Result: ${JSON.stringify(result)}`);
          this.formSubmitted = true;
          if (!this.showSuccessMessage) {
            this.showSuccessMessage = true;
            this.visible = true;
          }
        },
        error: (error) => {
          this.loggingService.error(`Error: ${JSON.stringify(error)}`);
          this.showError(error.status);
        },
      });
      this.loggingService.log(`Post Data: ${JSON.stringify(postData)}`);
    } else {
      this.showError(1);
    }
  }

  navigateToHome() {
    this.router.navigate(['home']);
  }
}

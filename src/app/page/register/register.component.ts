import { Component, Inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
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
import { DropdownInquadramentoComponent } from "../../componenti/dropdown-inquadramento/dropdown-inquadramento.component";
import { DropdownQualificaComponent } from "../../componenti/dropdown-qualifica/dropdown-qualifica.component";

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
    DropdownInquadramentoComponent,
    DropdownQualificaComponent
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


  qualificationsByLevel: { [key: string]: string[] } = {
    '1° Livello': ['Lavoratori generici', 'Operai comuni'],
    '2° Livello': ['Operai qualificati', 'Addetti alle macchine utensili semplici'],
    '3° Livello': ['Operai specializzati', 'Addetti a macchine utensili complesse'],
    '4° Livello': ['Operai specializzati di alta qualificazione', 'Manutentori', 'Addetti a linee di produzione automatizzate'],
    '5° Livello': ['Tecnici operativi', 'Capi squadra', 'Addetti alla programmazione di macchine CNC'],
    '6° Livello': ['Tecnici esperti', 'Capi reparto', 'Programmatori CNC avanzati'],
    '7° Livello': ['Quadri tecnici', 'Responsabili di area', 'Supervisori di produzione'],
    '8° Livello': ['Dirigenti tecnici', 'Responsabili di settore', 'Ingegneri di processo'],
    '9° Livello': ['Dirigenti di alto livello', 'Direttori tecnici', 'Project manager senior']
  };


  qualifications: string[] = [];

  userForm = new FormGroup({
    img: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]),
    surname: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]),
    TaxIDcode: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z]{6}\d{2}[A-EHLMPR-T][0-9LMNP-V]{2}[A-Z][0-9LMNP-V]{3}[A-Z]$/)]),
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$')]),
    birthDate: new FormControl(this.user().birthDate, Validators.required),
    birthPlace: new FormControl(this.user().birthPlace, Validators.required),
    residence: new FormControl(this.user().residence, Validators.required),
    position: new FormControl(this.user().position, Validators.required),
    qualification: new FormControl(this.user().qualification, Validators.required),
    iban: new FormControl(this.user().iban, Validators.required),
    hireDate: new FormControl(this.user().hireDate, Validators.required)
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
      const postData: User = {
        firstName: this.userForm.value.name,
        lastName: this.userForm.value.surname,
        email: this.userForm.value.email,
        codiceFiscale: this.userForm.value.TaxIDcode,
        birthDate: this.userForm.value.birthDate || new Date(),
        birthPlace: this.userForm.value.birthPlace || '',
        residence: this.userForm.value.residence || '',
        position: this.userForm.value.position?.toLowerCase() || '',
        qualification: this.userForm.value.qualification || '',
        iban: this.userForm.value.iban || '',
        hireDate: this.userForm.value.hireDate || new Date(),
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
      console.log(this.userForm);
      this.findInvalidControls();
    }
  }

  onInquadramentoChange(selectedInquadramento: string) {
   
    this.qualifications = this.qualificationsByLevel[selectedInquadramento] || [];
    this.userForm.get('position')?.setValue(selectedInquadramento);
    this.userForm.get('qualification')?.setValue(null); 
  }

  onQualificaChange(selectedQualifica: string) {
    this.userForm.get('qualification')?.setValue(selectedQualifica);
  }

  navigateToHome() {
    this.router.navigate(['home']);
  }

  findInvalidControls() {
    const invalid: never[] = [];
    const controls = this.userForm.controls;
    for (const name in controls) {
   
    }
    console.log(invalid);
  }
}

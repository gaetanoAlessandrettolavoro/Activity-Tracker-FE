import { Component, OnInit, signal } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { AdminserviceService } from '../../servizi/adminservice.service';
import { UserServiceService } from '../../servizi/user-service.service';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/userModel';
import { ErrorServiziService } from '../../servizi/error-servizi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { LoggingService } from '../../servizi/logging.service';
import { ImageModule } from 'primeng/image';
import { DialogModule } from 'primeng/dialog';
import { RecaptchaComponent } from '../../componenti/recaptcha/recaptcha.component';
import { DropdownQualificaComponent } from "../../componenti/dropdown-qualifica/dropdown-qualifica.component";
import { DropdownInquadramentoComponent } from "../../componenti/dropdown-inquadramento/dropdown-inquadramento.component";

@Component({
  selector: 'app-admin-mode-dati-user-spe',
  standalone: true,
  imports: [ToastModule, FormsModule, ReactiveFormsModule, ImageModule, DialogModule, RecaptchaComponent, DropdownQualificaComponent, DropdownInquadramentoComponent],
  templateUrl: './admin-mode-dati-user-spe.component.html',
  styleUrl: './admin-mode-dati-user-spe.component.css',
  providers: [MessageService]
})
export class AdminModeDatiUserSpeComponent implements OnInit {
onInquadramentoChange($event: Event) {
throw new Error('Method not implemented.');
}
onQualificaChange($event: string) {
throw new Error('Method not implemented.');
}
  user = signal<User>({} as User);
  id: any = this.route.params.pipe(map((p) => p['id']));qualifications!: string[];
;

  visibleCaptcha: boolean = false;

  // Aggiornamento del form per includere i nuovi campi: data di nascita, luogo di nascita, residenza, inquadramento, qualifica, IBAN e data di assunzione
  userForm = new FormGroup({
    firstName: new FormControl(this.user().firstName, [Validators.required]),
    lastName: new FormControl(this.user().lastName, [Validators.required]),
    codiceFiscale: new FormControl(this.user().codiceFiscale, [Validators.required]),
    birthDate: new FormControl(this.user().birthDate || new Date(), [Validators.required]),
    birthPlace: new FormControl(this.user().birthPlace || '', [Validators.required]),
    residence: new FormControl(this.user().residence || '', [Validators.required]),
    position: new FormControl(this.user().position?.toLowerCase() || '', [Validators.required]),
    qualification: new FormControl(this.user().qualification || '', [Validators.required]),
    iban: new FormControl(this.user().iban || '', [Validators.required]),
    hireDate: new FormControl(this.user().hireDate || new Date(), [Validators.required]),
  });
  
  constructor(
    private logging: LoggingService,
    private adminService: AdminserviceService,
    private userService: UserServiceService,
    private messageService: MessageService,
    private errors: ErrorServiziService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  showError(statusCode: number, errorMessage?: string) {
    if (statusCode === 2 && !!errorMessage) {
      this.messageService.add({ severity: 'error', summary: 'Errore', detail: errorMessage });
    }
    if (statusCode === 401 || statusCode === 429) {
      this.messageService.add(this.errors.getErrorMessage(statusCode));
      setTimeout(() => {
        this.userService.logout();
        this.router.navigate(['/login']);
      }, 3000);
    } else {
      this.messageService.add(this.errors.getErrorMessage(statusCode));
      this.logging.error(`error occurred with status code: ${statusCode}`);
    }
  }

  getInfo() {
    this.route.params.subscribe({
      next: (params) => {
        const id = params['id'];
        this.adminService.getOneUser(id).subscribe({
          next: (result) => {
            this.user.set(result.data);
            this.logging.log(`fetched user info for ID: ${id}`);
          },
          error: (error) => {
            this.showError(error.status);
            this.logging.error(`failed to fetch user info for ID: ${id} with error: ${error.message}`);
          }
        });
      },
      error: (error) => {
        this.showError(error.status);
        this.logging.error(`failed to process route params with error: ${error.message}`);
      }
    });
  }

  ngOnInit(): void {
    this.getInfo();
  }

  saveChanges() {
    if (this.userForm.valid) {
      this.route.params.subscribe({
        next: (params) => {
          const id = params['id'];
          const updatedUser: User = {
            ...this.user(),
            firstName: this.user().firstName,
            lastName: this.user().lastName,
            codiceFiscale: this.user().codiceFiscale,
            birthDate: this.user().birthDate,
            birthPlace: this.user().birthPlace,
            residence: this.user().residence,
            position: this.user().position?.toLowerCase(),
            qualification: this.user().qualification,
            iban: this.user().iban,
            hireDate: this.user().hireDate
          };
          this.adminService.patchUser(id, updatedUser).subscribe({
            next: (res) => {
              this.logging.log(`User updated successfully with ID: ${id}`);
              console.log(res);
              this.messageService.add({
                severity: 'success',
                summary: 'Modifiche salvate',
                detail: 'Le modifiche sono state salvate con successo.',
              });
              this.getInfo();
            },
            error: (error) => {
              this.showError(error.status);
              this.logging.error(`Failed to update user with ID: ${id} with error: ${error.message}`);
            }
          });
        },
        error: (error) => {
          this.showError(error.status);
          this.logging.error(`Failed to process route params for update with error: ${error.message}`);
        }
      });
    } else {
      this.showError(1);
      this.logging.error('User form is invalid on save attempt');
    }
  }

  changePwd() {
    this.userService.forgotPassword(this.user().email).subscribe({
      next: (res) => {
        this.logging.log(`Password reset email sent for user: ${this.user().email}`);
        console.log(res);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: "L'email per il reset della password è stata inviata."
        });
      },
      error: (error) => {
        this.logging.error(`Failed to send password reset email for user: ${this.user().email} with error: ${error.message}`);
        this.showError(error.status);
      }
    });
  }

  openCaptcha() {
    this.visibleCaptcha = true;
  }

  close() {
    this.router.navigate(['/']);
    this.logging.log('Navigated to home');
  }

  captchaError() {
    this.showError(2, 'Errore nella risoluzione del captcha');
    this.visibleCaptcha = false;
  }
}
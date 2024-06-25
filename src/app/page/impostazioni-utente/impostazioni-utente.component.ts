import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/userModel';
import { UserServiceService } from '../../servizi/user-service.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule, UploadEvent } from 'primeng/fileupload';

@Component({
    selector: 'app-impostazioniutente',
    templateUrl: './impostazioni-utente.component.html',
    styleUrls: ['./impostazioni-utente.component.css'],
    standalone: true,
    imports: [RouterLink, ToastModule, FileUploadModule, ReactiveFormsModule, FormsModule],
    providers: [MessageService]
})
export class UserRouteComponent implements OnInit {
  formData = new FormData();
  user = signal<User>({} as User);

  userForm = new FormGroup({
    firstName: new FormControl(this.user().firstName, [Validators.required]),
    lastName: new FormControl(this.user().lastName, [Validators.required]),
    codiceFiscale: new FormControl(this.user().codiceFiscale, [Validators.required]),
  })
  image! : any

  constructor(private router: Router, private userService: UserServiceService, private messageService: MessageService) {}

  showError(statusCode: number) {
    switch (statusCode) {
      case 400:
        this.messageService.add({
          severity: 'error',
          summary: 'Errore 400',
          detail: 'Errore durante la richiesta, riprova più tardi.',
        });
        break;
      case 401:
        this.messageService.add({
          severity: 'error',
          summary: 'Errore 401',
          detail: 'Sembra che tu non sia autenticato. Accedi per continuare.',
        });
        setTimeout(() => {
          this.userService.logout();
          this.router.navigate(['/login']);
        }, 3000);
        break;
      case 429:
        this.messageService.add({
          severity: 'error',
          summary: 'Errore 429',
          detail: 'Troppi tentativi di accesso, riprova tra un\'ora.',
        });
        setTimeout(() => {
          this.userService.logout();
          this.router.navigate(['/login']);
        }, 3000);
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

  getInfo() {
    this.userService.getMe().subscribe({
      next: (result) => {
        this.user.set(result.data);
      },
      error: (error) => {
        this.showError(error.status);
      }
    })
  }

  ngOnInit(): void {
    this.getInfo();
  }

  saveChanges() {
    if(this.userForm.valid){
      const updatedUser = {
        firstName: this.user().firstName,
        lastName: this.user().lastName,
        codiceFiscale: this.user().codiceFiscale,
        propic: this.formData
      }
      console.log(updatedUser);
      this.userService.updateMe(updatedUser).subscribe({
        next: (res) => {
          console.log(updatedUser);
          this.messageService.add({
            severity: 'success',
            summary: 'Modifiche salvate',
            detail: 'Le modifiche sono state salvate con successo.',
          });
          this.getInfo();
        },
        error: (error) => this.showError(error.status)
      });
    } else {
      this.showError(1);
    }
  }

  onUpload(event: any) {
    this.image = event.files[0];
    this.formData = event.files[0];
    console.log(this.formData)
  }
}

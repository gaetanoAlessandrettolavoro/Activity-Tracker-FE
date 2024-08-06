import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/userModel';
import { UserServiceService } from '../../servizi/user-service.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { ErrorServiziService } from '../../servizi/error-servizi.service';
import { LoggingService } from '../../servizi/logging.service';

@Component({
  selector: 'app-impostazioniutente',
  templateUrl: './impostazioni-utente.component.html',
  styleUrls: ['./impostazioni-utente.component.css'],
  standalone: true,
  imports: [RouterLink, ToastModule, FileUploadModule, ReactiveFormsModule, FormsModule],
  providers: [MessageService],
})
export class UserRouteComponent implements OnInit {
onInput($event: Event) {
throw new Error('Method not implemented.');
}
  formData = new FormData();
  user = signal<User>({} as User);

  userForm = new FormGroup({
    firstName: new FormControl(this.user().firstName, [Validators.required]),
    lastName: new FormControl(this.user().lastName, [Validators.required]),
    codiceFiscale: new FormControl(this.user().codiceFiscale, [Validators.required]),
    birthDate: new FormControl(this.user().birthDate),
    birthPlace: new FormControl(this.user().birthPlace),
    residence: new FormControl(this.user().residence),
    position: new FormControl(this.user().position),
    qualification: new FormControl(this.user().qualification),
    iban: new FormControl(this.user().iban),
    hireDate: new FormControl(this.user().hireDate)
  });
  
  image!: any;
  studentFile: any;
  imagePath: any;
  immagine!: any;
hireDate: any;

  constructor(
    private router: Router,
    private userService: UserServiceService,
    private messageService: MessageService,
    private errors: ErrorServiziService,
    private logging: LoggingService
  ) {}

  showError(statusCode: number) {
    if (statusCode === 401 || statusCode === 429) {
      this.messageService.add(this.errors.getErrorMessage(statusCode));
      setTimeout(() => {
        this.userService.logout();
        this.router.navigate(['/login']);
      }, 3000);
    } else if (statusCode === 400) {
      this.messageService.add({...this.errors.getErrorMessage(statusCode), detail: 'I campi inseriti non sono validi'});
    } else {
      this.messageService.add(this.errors.getErrorMessage(statusCode));
    }
    this.logging.log(`Errore: ${statusCode}`);
  }

  getInfo() {
    this.userService.getMe().subscribe({
      next: (result) => {
        this.user.set(result.data);
        this.immagine = result.data.propic;
      },
      error: (error) => {
        this.showError(error.status);
        this.logging.error(`Errore nel recupero delle informazioni utente: ${error.status}`);
      }
    });
  }

  ngOnInit(): void {
    this.getInfo();
  }

  saveChanges() {
    if (this.userForm.valid) {
      const updatedUser = new FormData();
      updatedUser.append('firstName', this.user().firstName);
      updatedUser.append('lastName', this.user().lastName);
      updatedUser.append('codiceFiscale', this.user().codiceFiscale);
      updatedUser.append('birthDate', this.user().birthDate || '');
      updatedUser.append('birthPlace', this.user().birthPlace || '');
      updatedUser.append('residence', this.user().residence || '');
      updatedUser.append('position', this.user().position || '');
      updatedUser.append('qualification', this.user().qualification || '');
      updatedUser.append('iban', this.user().iban || '');
      updatedUser.append('hireDate', this.user().hireDate || '');
      if (this.image) {
        updatedUser.append('propic', this.image);
      }

      this.userService.updateMe(updatedUser).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Modifiche salvate',
            detail: 'Le modifiche sono state salvate con successo.'
          });
          this.logging.log('Modifiche salvate con successo');
          setTimeout(() => {
            window.location.reload();
          }, 500);
        },
        error: (error) => {
          this.logging.error(`Errore durante il salvataggio delle modifiche: ${error.status}`);
          this.showError(error.status);
        }
      });
    } else {
      this.logging.warn('Form non valido');
      this.showError(1);
    }
  }

  onUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log(this.formData.get('propic'));
    }
  }

  changePwd() {
    this.router.navigate(['/cambio-password']);
  }

  close() {
    this.router.navigate(['/']);
  }

  onFileSelected(event: Event): void {
    //@ts-ignore
    if (event.target.files.length > 0) {
      //@ts-ignore
      const file = event.target.files[0];
      this.studentFile = file;
      //@ts-ignore
      const mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) === null) {
        return;
      }
      const reader = new FileReader();
      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.image = file;
        this.saveChanges();
      };
    }
  }
  OnclickQualification(){
    console.log("Qualification")
  }
  OnclickPosition(){
    console.log("Inquadramento")
  }
}

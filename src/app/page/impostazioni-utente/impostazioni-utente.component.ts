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
import { NgIf } from '@angular/common';
import { DropdownInquadramentoComponent } from '../../componenti/dropdown-inquadramento/dropdown-inquadramento.component';
import { DropdownQualificaComponent } from '../../componenti/dropdown-qualifica/dropdown-qualifica.component';

@Component({
  selector: 'app-impostazioniutente',
  templateUrl: './impostazioni-utente.component.html',
  styleUrls: ['./impostazioni-utente.component.css'],
  standalone: true,
  imports: [RouterLink, ToastModule, FileUploadModule, ReactiveFormsModule, FormsModule, DropdownInquadramentoComponent, DropdownQualificaComponent],
  providers: [MessageService],
})
export class UserRouteComponent implements OnInit {
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

  // Qualification options mapped to job levels
  qualificationOptions: { [key: string]: string[] } = {
    '1° livello': ["Lavoratori generici", "Operai comuni"],
    '2° livello': ["Operai qualificati", "Addetti alle macchine utensili semplici"],
    '3° livello': ["Operai specializzati", "Addetti a macchine utensili complesse"],
    '4° livello': [
      "Operai specializzati di alta qualificazione",
      "Manutentori",
      "Addetti a linee di produzione automatizzate",
    ],
    '5° livello': ["Tecnici operativi", "Capi squadra", "Addetti alla programmazione di macchine CNC"],
    '6° livello': ["Tecnici esperti", "Capi reparto", "Programmatori CNC avanzati"],
    '7° livello': ["Quadri tecnici", "Responsabili di area", "Supervisori di produzione"],
    '8° livello': ["Dirigenti tecnici", "Responsabili di settore", "Ingegneri di processo"],
    '9° livello': ["Dirigenti di alto livello", "Direttori tecnici", "Project manager senior"]
  };

  availableQualifications: string[] = [];

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
        this.userForm.patchValue(result.data);

        // Update the available qualifications based on the current position
        this.updateQualifications(result.data.position);
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

  updateQualifications(selectedLevel: string) {
    // Get qualifications for the selected level, if any
    this.availableQualifications = this.qualificationOptions [selectedLevel.toLowerCase()] || ["No Result Found"];
    console.log (selectedLevel);
    console.log (this.qualificationOptions [selectedLevel.toLowerCase()]);
    this.userForm.get('qualification')?.setValue(this.availableQualifications[0] || ''); // Set default to the first qualification or blank
  }

  saveChanges() {
    if (this.userForm.valid) {
      const updatedUser = new FormData();
      updatedUser.append('firstName', this.userForm.get('firstName')?.value || '');
      updatedUser.append('lastName', this.userForm.get('lastName')?.value || '');
      updatedUser.append('codiceFiscale', this.userForm.get('codiceFiscale')?.value || '');
      updatedUser.append('birthDate', this.userForm.get('birthDate')?.value?.toISOString() || new Date().toISOString());
      updatedUser.append('birthPlace', this.userForm.get('birthPlace')?.value || '');
      updatedUser.append('residence', this.userForm.get('residence')?.value || '');
      updatedUser.append('position', this.userForm.get('position')?.value || '');
      updatedUser.append('qualification', this.userForm.get('qualification')?.value || '');
      updatedUser.append('iban', this.userForm.get('iban')?.value || '');
      updatedUser.append('hireDate', this.userForm.get('hireDate')?.value?.toISOString() || new Date().toISOString());
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

  onInquadramentoChange(selectedInquadramento: string) {
    this.updateQualifications(selectedInquadramento);
  }

  onQualificaChange(selectedQualifica: any) {
    this.userForm.get('qualification')?.setValue(selectedQualifica);
  }
}
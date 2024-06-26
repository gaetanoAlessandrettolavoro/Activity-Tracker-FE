import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/userModel';
import { UserServiceService } from '../../servizi/user-service.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule, UploadEvent } from 'primeng/fileupload';
import { ErrorServiziService } from '../../servizi/error-servizi.service';

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

  constructor(private router: Router, private userService: UserServiceService, private messageService: MessageService, private errors: ErrorServiziService) {}

  showError(statusCode: number) {
    if(statusCode === 401 || statusCode === 429) {
      this.messageService.add(this.errors.getErrorMessage(statusCode));
      setTimeout(() => {
        this.userService.logout();
        this.router.navigate(['/login']);
      }, 3000);
    } else {
      this.messageService.add(this.errors.getErrorMessage(statusCode));
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

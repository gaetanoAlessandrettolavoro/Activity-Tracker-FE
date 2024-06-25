import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavbarimpostutenteComponent } from "../../componenti/navbarimpostutente/navbarimpostutente.component";
import { User } from '../../models/userModel';
import { UserServiceService } from '../../servizi/user-service.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-impostazioniutente',
    templateUrl: './impostazioni-utente.component.html',
    styleUrls: ['./impostazioni-utente.component.css'],
    standalone: true,
    imports: [RouterLink, NavbarimpostutenteComponent, ToastModule, FormsModule, ReactiveFormsModule],
    providers: [MessageService]
})
export class UserRouteComponent implements OnInit {
  user = signal<User>({} as User);

  userForm = new FormGroup({
    firstName: new FormControl(this.user().firstName, [Validators.required]),
    lastName: new FormControl(this.user().lastName, [Validators.required]),
    codiceFiscale: new FormControl(this.user().codiceFiscale, [Validators.required]),
  })

  constructor(private router: Router, private userService: UserServiceService, private messageService: MessageService) {}

  show(statusCode: number) {
    if(statusCode === 401){
      this.messageService.add({
        severity: 'error',
        summary: 'Errore 401',
        detail: 'Sembra che tu non sia autenticato. Accedi per continuare.',
      });
      setTimeout(() => {
        this.userService.logout();
        this.router.navigate(['/login']);
      }, 3000);
    }
    if(statusCode === 500){
      this.messageService.add({
        severity: 'error',
        summary: 'Errore 500',
        detail: 'Errore interno del server, riprova più tardi.',
      });
    }
    if(statusCode === 1) {
      this.messageService.add({
        severity: 'error',
        summary: 'Errore',
        detail: 'Il form non è valido',
      });
    }
  }

  getInfo() {
    this.userService.getMe().subscribe({
      next: (result) => {
        this.user.set(result.data);
      },
      error: (error) => {
        this.show(error.status);
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
        propic: this.user().propic
      }
      this.userService.updateMe(updatedUser).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Modifiche salvate',
            detail: 'Le modifiche sono state salvate con successo.',
          });
          this.getInfo();
        },
        error: (error) => this.show(error.status)
      });
    } else {
      this.show(1);
    }
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/userModel';
import { AdminserviceService } from '../../servizi/adminservice.service';
import { UserServiceService } from '../../servizi/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'delete-user',
  standalone: true,
  imports: [],
  templateUrl: './delete-user-button.component.html',
  styleUrl: './delete-user-button.component.css',
})
export class DeleteUserButtonComponent {
  @Input({ required: true }) user!: User;
  @Output() userDeleted = new EventEmitter<boolean>();

  constructor(
    private deleteUser: AdminserviceService,
    private userService: UserServiceService,
    private router: Router,
  ) {}

  show(statusCode: number) {
    if (statusCode === 401) {
      console.log('Errore 401');
      alert('Sembra che tu non sia autenticato. Accedi per continuare.');
      this.userService.logout();
      this.router.navigate(['/login']);
    }
    if (statusCode === 500) {
      alert('Errore interno del server, riprova più tardi.');
    }
  }

  onClickDelete() {
    if (!!this.user._id) {
      if (this.user.role === 'admin') {
        alert('Non puoi eliminare un amministratore');
      } else {
        if (
          confirm(
            `Vuoi eliminare l'utente ${this.user.firstName} ${this.user.lastName} con codice fiscale "${this.user.codiceFiscale}" e email "${this.user.email}"?`,
          ) == true
        ) {
          this.deleteUser.deleteUser(this.user._id).subscribe({
            next: () => {
              this.userDeleted.emit(true);
            },
            error: (error) => {
              this.show(error.status);
            },
          });
        }
      }
    }
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../model/userModel';
import { DeleteUserService } from '../../servizi/delete-user.service';

@Component({
  selector: 'delete-user',
  standalone: true,
  imports: [],
  templateUrl: './delete-user-button.component.html',
  styleUrl: './delete-user-button.component.css'
})
export class DeleteUserButtonComponent {
  @Input({required: true}) user!: User;
  @Output() userDeleted = new EventEmitter<boolean>();

  constructor(private deleteUser: DeleteUserService) {}

  onClickDelete(){
    if(!!this.user._id){
      if(this.user.role === 'admin'){
        alert('Non puoi eliminare un amministratore');
      } else {
        if (confirm(`Vuoi eliminare l'utente ${this.user.firstName} ${this.user.lastName} con codice fiscale "${this.user.codiceFiscale}" e email "${this.user.email}"?`) == true) {
          this.deleteUser.deactivate(this.user._id).subscribe(() => {
            this.userDeleted.emit(true);
          });
        }
      }
    }
  }
}

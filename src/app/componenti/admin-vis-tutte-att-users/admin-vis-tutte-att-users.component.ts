import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DropdownMenuComponent } from '../drop-down/drop-down.component';
import { UserManualComponent } from '../user-manual/user-manual.component';

@Component({
  selector: 'app-admin-vis-tutte-att-users',
  standalone: true,
  imports: [ButtonModule, RouterLink,DropdownMenuComponent,UserManualComponent],
  templateUrl: './admin-vis-tutte-att-users.component.html',
  styleUrl: './admin-vis-tutte-att-users.component.css'
})
export class AdminVisTutteAttUsersComponent {

}
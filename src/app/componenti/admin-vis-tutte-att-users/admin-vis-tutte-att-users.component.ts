import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-admin-vis-tutte-att-users',
  standalone: true,
  imports: [ButtonModule, RouterLink],
  templateUrl: './admin-vis-tutte-att-users.component.html',
  styleUrl: './admin-vis-tutte-att-users.component.css'
})
export class AdminVisTutteAttUsersComponent {

}
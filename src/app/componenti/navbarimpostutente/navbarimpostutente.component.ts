import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { UserManualComponent } from '../user-manual/user-manual.component';

@Component({
  selector: 'app-navbarimpostutente',
  standalone: true,
  imports: [ButtonModule,UserManualComponent],
  templateUrl: './navbarimpostutente.component.html',
  styleUrl: './navbarimpostutente.component.css'
})
export class NavbarimpostutenteComponent {

}


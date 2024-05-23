import { Component, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-emaildimenticata',
  standalone: true,
  imports: [InputTextModule,FormsModule],
  templateUrl: './email-password-dimenticata.component.html',
  styleUrl: './email-password-dimenticata.component.css'
})
export class EmaildimenticataComponent {
Invia() {
throw new Error('Method not implemented.');
}
value: any;
userForm: any;
  email: string = '';

  submit() {
    if (this.email) {
      alert(`Email per reimpostare la password inviata a: ${this.email}`);
    } else {
      alert('Per favore, inserisci un indirizzo email.');
    }
  }
}

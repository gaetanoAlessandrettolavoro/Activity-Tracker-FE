import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { UserServiceService } from '../../../servizi/user-service.service';

@Component({
  selector: 'app-emaildimenticata',
  standalone: true,
  imports: [InputTextModule,FormsModule],
  templateUrl: './email-password-dimenticata.component.html',
  styleUrl: './email-password-dimenticata.component.css'
})
export class EmaildimenticataComponent {

  constructor(private userService: UserServiceService){}
   

value: any;
userForm: any;
  email: string = '';

  submit() {
    this.userService.forgotPassword(this.email).subscribe({
      next: (result: any) => {
        console.log(result)
      },
      error: (error: any) => {
        console.error('Si è verificato un errore:', error);
      }
    });
  }
  
}


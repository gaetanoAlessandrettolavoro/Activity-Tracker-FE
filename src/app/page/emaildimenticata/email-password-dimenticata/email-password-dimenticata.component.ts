import { HttpClient } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-emaildimenticata',
  standalone: true,
  imports: [InputTextModule,FormsModule],
  templateUrl: './email-password-dimenticata.component.html',
  styleUrl: './email-password-dimenticata.component.css'
})
export class EmaildimenticataComponent {

  constructor(private http : HttpClient){}
   

value: any;
userForm: any;
  email: string = '';

  submit() {
    this.postUser(this.email).subscribe({
      next: (result: any) => {
        console.log(result)
      },
      error: (error: any) => {
        console.error('Si è verificato un errore:', error);
      }
    });
  }

  postUser(data: any): Observable<any> {
    const params = { email: data }; 
  
    return this.http.post<any>('http://localhost:3000/api/v1/users/forgotPassword?uri=127.0.0.1', { email: data });
  }
  
}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminChiedResetPasswordUserService {
  private apiUrl = 'http://localhost:3000/api/v1/users/forgotPassword?uri=localhost'; // URL API 

  constructor(private http: HttpClient) {}

  AdminChiediResetPasswordUser(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}`, { email });
  }
}
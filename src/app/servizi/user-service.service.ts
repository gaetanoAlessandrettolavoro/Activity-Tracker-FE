import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { User } from '../models/userModel';
import { CookieService } from 'ngx-cookie-service';
import { alias } from './defines';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private cookie: CookieService
  ) {}

  register(data: any): Observable<any> {
    let apiUrl = `http://${alias}:3000/api/v1/users/signup`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(apiUrl, data, { headers });
  }

  login(user: { email: string; password: string }): Observable<any> {
    let apiUrl = `http://${alias}:3000/api/v1/users/login`;
    return this.http.post<any>(apiUrl, user, { withCredentials: true });
  }

  getRole(user: any): void {
    if (user.role === 'admin') {
      localStorage.setItem('admin', 'true');
    } else {
      localStorage.setItem('utente', 'true');
    }
  }

  getMe(): Observable<any> {
    return this.http.get<any>(`http://${alias}:3000/api/v1/users/getMe`, {
      withCredentials: true
    });
  }

  resetPassword(token: any, userForm: any): Observable<any> {
    return this.http.patch<any>(
      `http://${alias}:3000/api/v1/users/resetPassword/${token}`,
      userForm
    );
  }

  forgotPassword(emailInput: any): Observable<any> {
    return this.http.post<any>(`http://${alias}:3000/api/v1/users/forgotPassword?uri=${alias}FE`, { email: emailInput });
  }

  updatePassword(userForm: any): Observable<any> {
    return this.http.patch<any>(
      `http://${alias}:3000/api/v1/users/updateMyPassword`,
      userForm,
      { withCredentials: true }
    );
  }

  logout(): Observable<any> {
    localStorage.removeItem('admin');
    localStorage.removeItem('utente');
    return this.http.get<any>(`http://${alias}:3000/api/v1/users/logout`).pipe(
      tap(() => {
        this.router.navigate(['/login']);
      }),
    );
  }

  updateMe(data: any): Observable<any> {
    let apiUrl = `http://${alias}:3000/api/v1/users/updateMe`;
    return this.http.patch<any>(apiUrl, data, { withCredentials: true });
  }
}

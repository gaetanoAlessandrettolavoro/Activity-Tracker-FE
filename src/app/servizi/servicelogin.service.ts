import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceloginService {
  private apiUrl = 'http://localhost:3000/api/v1/users/login';  // URL dell'API

  constructor(private http: HttpClient) {}

  getUser(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data, { withCredentials: true });
  }

  isUtente(): boolean {
    return localStorage.getItem('utente') !== null;
  }

  isAdmin(): boolean {
    return localStorage.getItem('admin') === 'true';
  }

  login(user: { email: string; password: string }): Observable<any> {
    return this.getUser(user);
  }

  getUsernamelastNameUser(): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/v1/users/getMe`, {withCredentials: true});
  }

  setUser(user: any): void {
    if (user.role === 'admin') {
      localStorage.setItem('admin', 'true');
    } else {
      localStorage.setItem('utente', 'true');
    }
  }
}
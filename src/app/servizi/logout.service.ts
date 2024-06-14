import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
 private apiUrl = 'http://127.0.0.1:3000/api/v1/users/logout';  // URL API corretta

  constructor(private http: HttpClient, private router: Router) { }

  logout(): Observable<any> {
    localStorage.removeItem('admin');  
    localStorage.removeItem('user')
    return this.http.get<any>(this.apiUrl).pipe(
      tap(() => {
        this.router.navigate(['/login']);  
      })
    );
  }
}

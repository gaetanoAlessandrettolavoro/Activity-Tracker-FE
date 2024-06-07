import { Injectable } from '@angular/core';
import { HttpClientModule, HttpHeaders,HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostRegisterService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://127.0.0.1:3000/api/v1/users/signup';  // URL dell'API

  sendData(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.apiUrl, data, { headers });
  }











}

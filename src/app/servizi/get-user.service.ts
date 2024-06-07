import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetUserService {
 

  constructor(private http:HttpClient) { }
  private apiUrl = 'http://127.0.0.1:3000/api/v1/users/:id'  // URL dell'API

  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}



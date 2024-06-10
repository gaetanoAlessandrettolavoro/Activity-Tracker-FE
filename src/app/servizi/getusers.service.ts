import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetusersService {
  constructor(private http: HttpClient) {}
  private apiUrl = '.../api/v1/users'; // URL dell'API

  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl, { withCredentials: true });
  }
}
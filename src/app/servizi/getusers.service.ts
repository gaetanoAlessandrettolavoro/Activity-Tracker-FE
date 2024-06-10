import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetusersService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:3000/api/v1/users'; // URL dell'API

  getData(limit?: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?limit=${limit}`, {withCredentials : true});
  }

  getData25(pageNumber: number, limit?: number): Observable<any> {
    if (limit) {
      return this.http.get<any>(`${this.apiUrl}?page=${pageNumber}&limit=${limit}`, {withCredentials : true});
    }
    return this.http.get<any>(`${this.apiUrl}?page=${pageNumber}`, {withCredentials : true});
  }
}

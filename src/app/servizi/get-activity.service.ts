import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetActivityUserService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:3000/api/v1/activities/me'; 

  getData(limit?: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?isActive=true`, { withCredentials: true });
  }

  getData25(pageNumber: number, limit?: number): Observable<any> {
    if (limit) {
      return this.http.get<any>(`${this.apiUrl}?page=${pageNumber}&limit=${limit}?isActive=true`, { withCredentials: true });
    }
    return this.http.get<any>(`${this.apiUrl}?page=${pageNumber}?isActive=true`, { withCredentials: true });
  }
}

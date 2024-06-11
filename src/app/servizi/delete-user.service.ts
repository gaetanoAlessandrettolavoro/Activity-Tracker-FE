import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteUserService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000/api/v1/users/'

  deactivate(id: string): Observable<any> {
    return this.http.delete(this.apiUrl+id, { withCredentials: true });
  }
}

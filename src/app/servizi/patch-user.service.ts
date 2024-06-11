import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/userModel';

@Injectable({
  providedIn: 'root'
})
export class PatchUserService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://127.0.0.1:3000/api/v1/users'; // URL dell'API

  patchData(id: string, data:User): Observable<any> {
    const url = `${this.apiUrl}/${id}`;  
    return this.http.patch<any>(url, data);
  }
}

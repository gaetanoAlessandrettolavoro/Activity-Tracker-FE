import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TutteAttivitàUserService {
private apiUrl = 'http://localhost:3000/api/v1/activities'; //URL API

  constructor(private http: HttpClient) { }

  recuperaTutteLeAttivita(page: number, limit: number): Observable<any> {
 
    return this.http.get(`${this.apiUrl}?page=${page}&limit=${limit}&sort=_id`,{withCredentials:true});
  }
}

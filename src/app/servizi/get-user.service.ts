import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetUserService {
 

  constructor(private http:HttpClient) { }
  private apiUrl = 'http://localhost:3000/api/v1/users/'  // URL dell'API

  getData(id: string): Observable<any> {
    return this.http.get<any>(this.apiUrl+id, {withCredentials : true});
  }
}



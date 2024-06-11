import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceloginService {

  constructor(private http: HttpClient) { }



  private apiUrl = 'http://localhost:3000/api/v1/users/login';  // URL dell'API

  getUser(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data, { withCredentials: true });
  }

  checkAuthentication(x:any): void {
    if(x  === "admin"){
      localStorage.setItem("admin",'true')
}
    
  }
}

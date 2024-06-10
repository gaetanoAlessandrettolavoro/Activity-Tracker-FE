import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class GetusersService {

  constructor(private http:HttpClient, private cookie: CookieService) { }
  private apiUrl = 'http://localhost:3000/api/v1/users'  // URL dell'API

  getData(): Observable<any> {
    const headers = new HttpHeaders({
      'authorization': 'Bearer ' + this.cookie.get('jwt'),
    })
    return this.http.get<any>(this.apiUrl, { headers });
}
}
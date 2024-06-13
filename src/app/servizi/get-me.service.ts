import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetMeService {

  constructor(private http: HttpClient) {}

  getMe() {
    const apiUrl = 'http://localhost:3000/api/v1/users/GetMe';

    return this.http.get(apiUrl, { withCredentials: true });
  }

}

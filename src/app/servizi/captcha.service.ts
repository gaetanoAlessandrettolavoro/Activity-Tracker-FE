import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CaptchaService {
  constructor(private http: HttpClient) {}

  verifyCaptcha(token: string): Observable<any> {
    const url = `http://${environment.recaptcha.baseUrl}:3000/api/v1/captcha`;

    const body = {'g-recaptcha-response': token}

    return this.http.post(url, body);
  }
}

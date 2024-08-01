import { Injectable } from '@angular/core';
import { alias } from './defines';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CaptchaService {
  constructor(private http: HttpClient) {}

  verifyCaptcha(token: string): Observable<any> {
    const url = `http://${alias}:3000/api/v1/captcha`;

    const body = {'g-recaptcha-response': token}

    return this.http.post(url, body);
  }
}

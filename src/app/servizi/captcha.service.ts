import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CaptchaService {
  constructor() {}

  async verifyCaptcha(token: string) {
    const secretKey = environment.recaptcha.secretKey;
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

    try {
      const response = await axios.post(url);
      return response.data.success;
    } catch (error) {
      console.error('Errore nella verifica del CAPTCHA:', error);
      return false;
    }
  }
}

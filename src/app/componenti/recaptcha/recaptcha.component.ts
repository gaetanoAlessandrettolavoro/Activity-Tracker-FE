import { Component, EventEmitter, Output } from '@angular/core';
import { RECAPTCHA_SETTINGS, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { environment } from '../../../environments/environment';
import { CaptchaService } from '../../servizi/captcha.service';

@Component({
  selector: 'app-recaptcha',
  standalone: true,
  imports: [RecaptchaModule],
  templateUrl: './recaptcha.component.html',
  styleUrl: './recaptcha.component.css',
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: environment.recaptcha.siteKey } as RecaptchaSettings,
    },
  ],
})
export class RecaptchaComponent {
  private isValid: boolean = false;

  @Output() valid = new EventEmitter<boolean>();

  constructor(private captcha: CaptchaService) {}

  onCaptchaResolved(captchaResponse: any) {
    // console.log(`Resolved captcha with response: ${captchaResponse}`);
    this.captcha.verifyCaptcha(captchaResponse).catch(err => console.error(err)).then(res => console.log(res));
    }
}

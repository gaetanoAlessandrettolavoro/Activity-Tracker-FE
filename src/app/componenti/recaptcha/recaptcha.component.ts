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
  @Output() isValid = new EventEmitter<boolean>();

  constructor(private captcha: CaptchaService) {}

  onCaptchaResolved(captchaResponse: any) {
    // console.log(`Resolved captcha with response: ${captchaResponse}`);
    this.captcha.verifyCaptcha(captchaResponse).subscribe({
      next: (res) => {
        if(res.success) {
          this.isValid.emit(true);
        } else {
          this.isValid.emit(false);
        }
      },
      error: (err) => {
        this.isValid.emit(false);
      }
    })
    }
}

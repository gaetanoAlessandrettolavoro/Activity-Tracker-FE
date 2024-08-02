import { Component, OnInit, signal } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { AdminserviceService } from '../../servizi/adminservice.service';
import { UserServiceService } from '../../servizi/user-service.service';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/userModel';
import { ErrorServiziService } from '../../servizi/error-servizi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { LoggingService } from '../../servizi/logging.service';
import { ImageModule } from 'primeng/image'
import { DialogModule } from 'primeng/dialog';
import { RecaptchaComponent } from '../../componenti/recaptcha/recaptcha.component';

@Component({
  selector: 'app-admin-mode-dati-user-spe',
  standalone: true,
  imports: [ToastModule, FormsModule, ReactiveFormsModule, ImageModule, DialogModule, RecaptchaComponent],
  templateUrl: './admin-mode-dati-user-spe.component.html',
  styleUrl: './admin-mode-dati-user-spe.component.css',
  providers: [MessageService]
})
export class AdminModeDatiUserSpeComponent implements OnInit {
  user = signal<User>({} as User);
  id: any = this.route.params.pipe(map((p) => p['id']));;

  visibleCaptcha: boolean = false;

  userForm = new FormGroup({
    firstName: new FormControl(this.user().firstName, [Validators.required]),
    lastName: new FormControl(this.user().lastName, [Validators.required]),
    codiceFiscale: new FormControl(this.user().codiceFiscale, [Validators.required]),
  })
  
  constructor(private logging:LoggingService,private adminService: AdminserviceService, private userService: UserServiceService, private messageService: MessageService, private errors: ErrorServiziService, private router: Router, private route: ActivatedRoute) {}

  showError(statusCode: number, errorMessage?: string) {
    if(statusCode === 2 && !!errorMessage) {
      this.messageService.add({severity: 'error', summary: 'Errore', detail: errorMessage});
    }
    if(statusCode === 401 || statusCode === 429) {
      this.messageService.add(this.errors.getErrorMessage(statusCode));
      setTimeout(() => {
        this.userService.logout();
        this.router.navigate(['/login']);
      }, 3000);
    } else {
      this.messageService.add(this.errors.getErrorMessage(statusCode));
      this.logging.error(`error occurred with status code: ${statusCode}`);
    }
  }

  getInfo() {
    this.route.params.subscribe({
      next: (params) => {
        const id = params['id'];
        this.adminService.getOneUser(id).subscribe({
          next: (result) => {
            this.user.set(result.data);
            this.logging.log(`fetched user info for ID: ${id}`);
          },
          error: (error) => {
            this.showError(error.status);
            this.logging.error(`failed to fetch user info for ID: ${id} with error: ${error.message}`);
          }
        });
      },
      error: (error) => {
        this.showError(error.status);
        this.logging.error(`failed to process route params with error: ${error.message}`);
      }
    });
  }

  ngOnInit(): void {
    this.getInfo();
  }

  saveChanges() {
    if(this.userForm.valid){
      this.route.params.subscribe({
        next: (params) => {
          const id = params['id'];
          const updatedUser: User = {
            ...this.user(),
            firstName: this.user().firstName,
            lastName: this.user().lastName,
            codiceFiscale: this.user().codiceFiscale,
          }
          this.adminService.patchUser(id, updatedUser).subscribe({
            next: (res) => {
              this.logging.log(`user updated successfully with ID: ${id}`);
              console.log(res);
             
              this.messageService.add({
                severity: 'success',
                summary: 'Modifiche salvate',
                detail: 'Le modifiche sono state salvate con successo.',
              });
              this.getInfo();
            },
            error: (error) => { this.showError(error.status);
              this.logging.error(`failed to update user with ID: ${id} with error: ${error.message}`);
            }
          });
        },
            
    
        error: (error) => { this.showError(error.status);
          this.logging.error(`failed to process route params for update with error: ${error.message}`);
        }
      });
    } else { this.showError(1);
      this.logging.error('User form is invalid on save attempt'); 
    }
  }

  changePwd(){
    this.userService.forgotPassword(this.user().email).subscribe({
      next: (res) => {
        this.logging.log(`pèassword reset email sent for user: ${this.user().email}`);
        console.log(res);
        this.messageService.add({severity: 'success', summary:'Success', detail:'L\'email per il reset della password è stata inviata.'})
      },
      error: (error) => { 
        this.logging.error(`ftailed to send password reset email for user: ${this.user().email} with error: ${error.message}`); // Logga l'errore
        this.showError(error.status);
      }
    });
  }

  openCaptcha(){
    this.visibleCaptcha = true;
  }

  close(){
    this.router.navigate(['/']);
    this.logging.log('navigated to home');
  }

  captchaError() {
    this.showError(2, 'Errore nella risoluzione del captcha');
    this.visibleCaptcha = false;
  }

}
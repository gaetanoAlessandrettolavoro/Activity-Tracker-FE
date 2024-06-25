import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { AdminserviceService } from '../../servizi/adminservice.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { UserServiceService } from '../../servizi/user-service.service';

@Component({
  selector: 'app-add-type-activity',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    ToastModule,
  ],
  templateUrl: './add-type-activity.component.html',
  styleUrl: './add-type-activity.component.css',
  providers: [MessageService],
})
export class AddTypeActivityComponent {
  visible: boolean = false;
  taskname: string = '';
  constructor(
    private addActivity: AdminserviceService,
    private router: Router,
    private userService: UserServiceService,
    private messageService: MessageService,
  ) {}

  show(statusCode: number) {
    switch (statusCode) {
      case 400:
        this.messageService.add({
          severity: 'error',
          summary: 'Errore 400',
          detail: 'Richiesta non valida, riprova.',
        });
        break;
      case 401:
        this.messageService.add({
          severity: 'error',
          summary: 'Errore 401',
          detail: 'Sembra che tu non sia autenticato. Accedi per continuare.',
        });
        setTimeout(() => {
          this.userService.logout();
          this.router.navigate(['/login']);
        }, 3000);
        break;
      case 403:
        this.messageService.add({
          severity: 'error',
          summary: 'Errore 403',
          detail: 'Non hai i permessi per eseguire questa azione.',
        });
        break;
        case 429:
          this.messageService.add({
            severity: 'error',
            summary: 'Errore 429',
            detail: 'Troppi tentativi di accesso, riprova tra un\'ora.',
          });
          setTimeout(() => {
            this.userService.logout();
            this.router.navigate(['/login']);
          }, 3000);
          break;
      case 500:
        this.messageService.add({
          severity: 'error',
          summary: 'Errore 500',
          detail: 'Errore interno del server, riprova più tardi.',
        });
        break;
    }
  }

  submit() {
    this.addActivity.addTask(this.taskname).subscribe({
      next: (result: any) => {
        this.visible = false;
        this.taskname = '';
        console.log(result);
      },
      error: (error) => {
        this.show(error.status);
      }
    });
  }

  showDialog() {
    this.visible = true;
  }
}

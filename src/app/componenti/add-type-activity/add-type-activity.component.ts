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
import { ErrorServiziService } from '../../servizi/error-servizi.service';

@Component({
  selector: 'add-type-activity',
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
    private errors: ErrorServiziService
  ) {}

  showError(statusCode: number) {
    if(statusCode === 401 || statusCode === 429) {
      this.messageService.add(this.errors.getErrorMessage(statusCode));
      setTimeout(() => {
        this.userService.logout();
        this.router.navigate(['/login']);
      }, 3000);
    } else {
      this.messageService.add(this.errors.getErrorMessage(statusCode));
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
        this.showError(error.status);
      }
    });
  }

  showDialog() {
    this.visible = true;
  }
}

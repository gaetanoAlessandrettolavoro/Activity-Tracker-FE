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

@Component({
  selector: 'app-admin-mode-dati-user-spe',
  standalone: true,
  imports: [ToastModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-mode-dati-user-spe.component.html',
  styleUrl: './admin-mode-dati-user-spe.component.css',
  providers: [MessageService]
})
export class AdminModeDatiUserSpeComponent implements OnInit {
  user = signal<User>({} as User);
  id: any = this.route.params.pipe(map((p) => p['id']));;

  userForm = new FormGroup({
    firstName: new FormControl(this.user().firstName, [Validators.required]),
    lastName: new FormControl(this.user().lastName, [Validators.required]),
    codiceFiscale: new FormControl(this.user().codiceFiscale, [Validators.required]),
  })
  
  constructor(private adminService: AdminserviceService, private userService: UserServiceService, private messageService: MessageService, private errors: ErrorServiziService, private router: Router, private route: ActivatedRoute) {}

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

  getInfo() {
    this.route.params.subscribe({
      next: (params) => {
        const id = params['id'];
        this.adminService.getOneUser(id).subscribe({
          next: (result) => {
            this.user.set(result.data);
          },
          error: (error) => {
            this.showError(error.status);
          }
        })
      },
      error: (error) => this.showError(error.status)
    })
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
              console.log(res);
              this.messageService.add({
                severity: 'success',
                summary: 'Modifiche salvate',
                detail: 'Le modifiche sono state salvate con successo.',
              });
              this.getInfo();
            },
            error: (error) => this.showError(error.status)
          });
        },
        error: (error) => this.showError(error.status)
      })
    } else {
      this.showError(1);
    }
  }

  changePwd(){
    this.userService.forgotPassword(this.user().email).subscribe({
      next: (res) => {
        console.log(res);
        this.messageService.add({severity: 'success', summary:'Success', detail:'L\'email per il reset della password è stata inviata.'})
      },
      error: (error) => console.error(error)
    })
  }

  close(){
    this.router.navigate(['/'])
  }

}
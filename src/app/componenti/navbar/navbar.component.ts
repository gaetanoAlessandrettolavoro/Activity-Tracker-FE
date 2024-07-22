import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';

import { UserManualComponent } from "../user-manual/user-manual.component";
import { DropdownMenuComponent } from "../drop-down/drop-down.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { Router } from '@angular/router';
import { UserServiceService } from '../../servizi/user-service.service';
import { LoggingService } from '../../servizi/logging.service';
import { ErrorServiziService } from '../../servizi/error-servizi.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';



@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  imports: [CommonModule, UserManualComponent, DropdownMenuComponent, SidebarComponent,AvatarGroupModule,AvatarModule, ToastModule],
  providers: [MessageService]
})
export class NavbarComponent implements OnInit {

  userEmail: string='';
propic: any;
userPropic: any;
 
  
  constructor(private router: Router,private userService: UserServiceService, private logging: LoggingService, private errors: ErrorServiziService, private messageService: MessageService) {}
  
  isNotAuthenticated:boolean=true
  isAdmin :boolean= false
  isUser:boolean = false

  showError(statusCode: number, errorMessage?: string) {
    this.logging.error(`Error occurred fetching data.\nError ${statusCode} with message: ${errorMessage}`);
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


  ngDoCheck(){
  
    if(localStorage.getItem("utente")){
      this.isUser = true
      this.isNotAuthenticated=false
    }
    else if(localStorage.getItem("admin")){
          this.isAdmin = true
          this.isNotAuthenticated=false
    }
    else if (!localStorage.getItem("admin") && !localStorage.getItem("utente")){
      this.isAdmin=false
      this.isUser=false
      this.isNotAuthenticated=true
     
    }
  
  }

  ngOnInit(): void {
    this.ngDoCheck();
    if(!this.isNotAuthenticated){
      this.userService.getMe().subscribe({
        next: (userData: any) => {
          if (userData && userData.data && userData.data.email) {
            this.userEmail = userData.data.email;
          } else {
            this.logging.error(`Email not found in user data`);
          }
        },
        error: (error) => {
          this.showError(error.status, error.error.message);
        }
      });
    }
  }

  

  navigateToRegister() {
    this.router.navigate(['registrati']);
  }

  navigateToLogin() {
    this.router.navigate(['login']);
  }


}
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';

import { UserManualComponent } from "../user-manual/user-manual.component";
import { DropdownMenuComponent } from "../drop-down/drop-down.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { Router } from '@angular/router';
import { UserServiceService } from '../../servizi/user-service.service';



@Component({
  
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
    imports: [CommonModule, UserManualComponent, DropdownMenuComponent, SidebarComponent,AvatarGroupModule,AvatarModule]
})
export class NavbarComponent implements OnInit {

  userEmail: string='';
 
  
  constructor(private router: Router,private userService: UserServiceService) {}
  
  isNotAuthenticated:boolean=true
  isAdmin :boolean= false
  isUser:boolean = false


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
    this.userService.getMe().subscribe({
      next: (userData: any) => {
        console.log('User data:', userData); 

        
        if (userData && userData.data && userData.data.email) {
          this.userEmail = userData.data.email;
        } else {
          console.error('Email non trovata nei dati utente');
        }
      }

       
    
    });
  }

  

  navigateToRegister() {
    this.router.navigate(['registrati']);
  }

  navigateToLogin() {
    this.router.navigate(['login']);
  }


}

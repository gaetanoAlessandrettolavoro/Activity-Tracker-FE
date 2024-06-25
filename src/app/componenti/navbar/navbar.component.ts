import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { UserManualComponent } from "../user-manual/user-manual.component";
import { DropdownMenuComponent } from "../drop-down/drop-down.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { Router } from '@angular/router';



@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
    imports: [CommonModule, UserManualComponent, DropdownMenuComponent, SidebarComponent]
})
export class NavbarComponent {
  constructor(private router: Router) {}
  isNotAuthenticated:boolean=true
  isAdmin :boolean= false
  isUser:boolean = false


  ngDoCheck(){
  
    if(localStorage.getItem("utente")){
      console.log("utente")
      this.isUser = true
      this.isNotAuthenticated=false
    }
    else if(localStorage.getItem("admin")){
          console.log("admin")
          this.isAdmin = true
          this.isNotAuthenticated=false
    }
    else if (!localStorage.getItem("admin") && !localStorage.getItem("utente")){
      console.log("non autenticato")
      this.isAdmin=false
      this.isUser=false
      this.isNotAuthenticated=true
     
    }
  
  }

  

  navigateToRegister() {
    this.router.navigate(['registrati']);
  }

  navigateToLogin() {
    this.router.navigate(['login']);
  }


}

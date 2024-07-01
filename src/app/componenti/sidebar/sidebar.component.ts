import { Component } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { Router, RouterLink } from '@angular/router';
import { UserServiceService } from '../../servizi/user-service.service';
import { CommonModule } from '@angular/common';
import { AdminatoacceptusersComponent } from "../adminatoacceptusers/adminatoacceptusers.component";

@Component({
    selector: 'app-sidebar',
    standalone: true,
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
    imports: [SidebarModule, ButtonModule, RippleModule, AvatarModule, StyleClassModule, RouterLink, CommonModule, AdminatoacceptusersComponent]
})
export class SidebarComponent {
  
  constructor(private userService: UserServiceService, private router: Router) { }
  sidebarVisible: boolean = false;
  isAdmin :boolean= false
  isUser:boolean = false

  ngDoCheck(){
    if(localStorage.getItem("utente")){
      this.isUser = true
    }
    else if(localStorage.getItem("admin")){
      this.isAdmin = true
    }
  }




  logout() {
    this.userService.logout().subscribe(
      response => {
        this.router.navigate(['/home']);
      },
    );
  }

  close() {
    this.sidebarVisible = false;
  }
}

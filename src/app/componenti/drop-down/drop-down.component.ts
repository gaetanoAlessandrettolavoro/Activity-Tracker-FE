import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { UserManualComponent } from '../user-manual/user-manual.component';
import { UserServiceService } from '../../servizi/user-service.service';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { LoggingService } from '../../servizi/logging.service';

@Component({
  selector: 'app-dropdown-menu',
  standalone: true,
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css'],
  imports: [AvatarGroupModule,AvatarModule,MenubarModule, MenuModule, CommonModule, ButtonModule,UserManualComponent],
})

export class DropdownMenuComponent implements OnInit {
  menuVisible: boolean = false;
  items!: MenuItem[];
  isUser: boolean = false; 
  isAdmin:boolean=false;
  showMenu:boolean= false;
  propic: string='';

  constructor(private router: Router, private userService: UserServiceService, private logging: LoggingService) {} 
  ngDoCheck(){
    if(localStorage.getItem("utente")){
      this.isUser = true
    }
    else if(localStorage.getItem("admin")){
          this.isAdmin = true
    }
  }
  ngOnInit():void {
    this.ngDoCheck();
    if(this.isAdmin || this.isUser){
      this.items = [
        { 
          label: 'Impostazioni', 
          command: () => { this.navigateBasedOnRole(); }
        },
        { 
          label: 'Logout', 
          command: () => { this.logout(); }
        },
      ];
  
      this.userService.getMe().subscribe({
        next: (userData: any) => {
          this.logging.log(`User with email ${userData.data.email} logged`); 
          if (userData && userData.data && userData.data.propic) {
            this.propic = userData.data.propic;
          } else {
            this.logging.error(`Profile picture url not found`);
          }
        },
        error: (err) => {
          this.logging.error(`Error occurred fetching data.\nError ${err.status} with message: ${err.error.message}`);
        }
      });
    }
  }
  isVisible() {
    this.menuVisible = !this.menuVisible;
  }

  

  

  

  navigateBasedOnRole() {
  
      this.router.navigate(['/impostazioni']);
   
  }
  logout() {
    this.userService.logout().subscribe(
      response => {
        this.router.navigate(['/home']);
      },
    
    );
  }
}
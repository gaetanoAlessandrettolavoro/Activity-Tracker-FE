import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { UserManualComponent } from '../user-manual/user-manual.component';
import { UserServiceService } from '../../servizi/user-service.service';

@Component({
  selector: 'app-dropdown-menu',
  standalone: true,
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css'],
  imports: [MenubarModule, MenuModule, CommonModule, ButtonModule,UserManualComponent],
})

export class DropdownMenuComponent implements OnInit {
  menuVisible: boolean = false;
  items!: MenuItem[];
  isUser: boolean = false; 
  isAdmin:boolean=false;
  showMenu:boolean= false;

  constructor(private router: Router, private userService: UserServiceService) {} 
  ngDoCheck(){
    if(localStorage.getItem("utente")){
      console.log("utente")
      this.isUser = true
    }
    else if(localStorage.getItem("admin")){
          console.log("admin")
          this.isAdmin = true
    }
  }
  ngOnInit() {
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
    console.log('Menu items:', this.items);
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
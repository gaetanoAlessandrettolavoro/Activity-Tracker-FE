import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dropdown-menu',
  standalone: true,
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css'],
  imports: [MenubarModule, MenuModule, CommonModule, ButtonModule],
})
export class DropdownMenuComponent implements OnInit {
  menuVisible: boolean = false;
  items!: MenuItem[];
  isAdmin: boolean = false; 

  constructor(private router: Router) {}

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
    if (this.isAdmin) {
      this.router.navigate(['impostazioniadmin']);
    } else {
      this.router.navigate(['impostazioniutente']);
    }
  }

  logout() {
    localStorage.removeItem('utente');
    this.router.navigate(['login/oggi']);
  }
}

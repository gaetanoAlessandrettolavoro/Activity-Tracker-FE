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
  menuVisible:boolean=false;
  items!: MenuItem[];

  constructor(private router: Router) {}

  ngOnInit() {
    console.log('vai');
    this.items = [
      { label: 'Impostazioni', command: () => { this.router.navigate(['impostazioni-utente']); } },
      { label: 'Logout', command: () => { this.logout(); } },
    ];
    console.log('Menu items:', this.items);
  }
  isVisible(){
    this.menuVisible = !this.menuVisible
  }

  logout() {
    localStorage.removeItem('utente');
    this.router.navigate(['login/oggi']);
  }
}

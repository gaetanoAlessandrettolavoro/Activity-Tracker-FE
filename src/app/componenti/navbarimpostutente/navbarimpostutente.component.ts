import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu'; 
import { MenuItem } from 'primeng/api';
import { UserManualComponent } from '../user-manual/user-manual.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbarimpostutente',
  standalone: true,
  imports: [MenubarModule, ButtonModule, MenuModule, UserManualComponent], 
  templateUrl: './navbarimpostutente.component.html',
  styleUrl: './navbarimpostutente.component.css'
})
export class NavbarimpostutenteComponent implements OnInit {
  items!: MenuItem[]; 

  constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
      {label: 'Impostazioni', command: () => {this.router.navigate(['impostazioni-utente']);}},
      {label: 'Logout', command: () => {this.logout();}},
    ];
  }

  logout() {
    localStorage.removeItem('utente');
    this.router.navigate(['login/oggi']);
  }
}



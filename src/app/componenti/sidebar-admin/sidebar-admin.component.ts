import { Component } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { Router, RouterLink } from '@angular/router';
import { UserServiceService } from '../../servizi/user-service.service';

@Component({
  selector: 'app-sidebar-admin',
  standalone: true,
  imports: [SidebarModule,ButtonModule,RippleModule,AvatarModule,StyleClassModule, RouterLink],
  templateUrl: './sidebar-admin.component.html',
  styleUrl: './sidebar-admin.component.css'
})
export class SidebarAdminComponent {
  sidebarVisible: boolean = false;

  constructor(private userService: UserServiceService, private router: Router) { }

  logout() {
    this.userService.logout().subscribe(
      response => {
        this.router.navigate(['/home']);
      },
    );
  }
}
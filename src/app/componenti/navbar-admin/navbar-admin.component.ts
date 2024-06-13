import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button'
import { RouterLink } from '@angular/router';
import { DropdownMenuComponent } from "../drop-down/drop-down.component";

@Component({
    selector: 'app-navbar-admin',
    standalone: true,
    templateUrl: './navbar-admin.component.html',
    styleUrl: './navbar-admin.component.css',
    imports: [MenubarModule, ButtonModule, RouterLink, DropdownMenuComponent]
})
export class NavbarAdminComponent {

}







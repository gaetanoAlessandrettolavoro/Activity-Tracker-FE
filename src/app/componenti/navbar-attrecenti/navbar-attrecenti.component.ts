import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { UserManualComponent } from '../user-manual/user-manual.component';
import { RouterLink } from '@angular/router';
import { DropdownMenuComponent } from "../drop-down/drop-down.component";


@Component({
    selector: 'app-navbar-attrecenti',
    standalone: true,
    templateUrl: './navbar-attrecenti.component.html',
    styleUrl: './navbar-attrecenti.component.css',
    imports: [MenubarModule, ButtonModule, UserManualComponent, RouterLink, DropdownMenuComponent]
})
export class NavbarAttrecentiComponent{

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button'
import { UserManualComponent } from '../user-manual/user-manual.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DropDownUserComponent } from "../drop-down-user/drop-down-user.component";


@Component({
    selector: 'navbarattgiornaliere',
    templateUrl: './navbarattgiornaliere.component.html',
    styleUrls: ['./navbarattgiornaliere.component.css'],
    standalone: true,
    imports: [MenubarModule, ButtonModule, UserManualComponent, SidebarComponent, DropDownUserComponent]
})
export class NavbarComponent {

    @ViewChild(SidebarComponent) sidebarAdminComponent!: SidebarComponent;

    firstName: string = '';
    lastName: string = '';



}
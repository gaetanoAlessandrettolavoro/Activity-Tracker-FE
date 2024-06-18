import { Component, OnInit, ViewChild } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button'
import { UserManualComponent } from '../user-manual/user-manual.component';
import { DropdownMenuComponent } from "../drop-down/drop-down.component";
import { SidebarComponent } from "../sidebarUtente/sidebar.component";
import { SidebarAdminComponent } from "../sidebar-admin/sidebar-admin.component";

@Component({
    selector: 'navbarattgiornaliere',
    templateUrl: './navbarattgiornaliere.component.html',
    styleUrls: ['./navbarattgiornaliere.component.css'],
    standalone: true,
    imports: [MenubarModule, ButtonModule, UserManualComponent, DropdownMenuComponent, SidebarComponent, SidebarAdminComponent]
})
export class NavbarComponent {

    @ViewChild(SidebarAdminComponent) sidebarAdminComponent!: SidebarAdminComponent;


}
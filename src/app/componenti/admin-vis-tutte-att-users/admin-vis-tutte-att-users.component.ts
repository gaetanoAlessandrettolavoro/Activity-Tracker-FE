import { Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DropdownMenuComponent } from '../drop-down/drop-down.component';
import { UserManualComponent } from '../user-manual/user-manual.component';
import { SidebarAdminComponent } from "../sidebar-admin/sidebar-admin.component";

@Component({
    selector: 'app-admin-vis-tutte-att-users',
    standalone: true,
    templateUrl: './admin-vis-tutte-att-users.component.html',
    styleUrl: './admin-vis-tutte-att-users.component.css',
    imports: [ButtonModule, RouterLink, DropdownMenuComponent, UserManualComponent, SidebarAdminComponent]
})
export class AdminVisTutteAttUsersComponent {
  @ViewChild(SidebarAdminComponent) sidebarAdminComponent!: SidebarAdminComponent;


}
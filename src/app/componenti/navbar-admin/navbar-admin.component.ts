import { Component, ViewChild } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button'
import { RouterLink } from '@angular/router';
import { DropdownMenuComponent } from "../drop-down/drop-down.component";
import { UserManualComponent } from '../user-manual/user-manual.component';
import { CommonModule } from '@angular/common';
import { AddTypeActivityComponent } from "../add-type-activity/add-type-activity.component";
import { SidebarAdminComponent } from "../sidebar-admin/sidebar-admin.component";



@Component({
    selector: 'app-navbar-admin',
    standalone: true,
    templateUrl: './navbar-admin.component.html',
    styleUrl: './navbar-admin.component.css',
    imports: [MenubarModule, ButtonModule, RouterLink, DropdownMenuComponent, UserManualComponent, CommonModule, AddTypeActivityComponent, SidebarAdminComponent]
})
export class NavbarAdminComponent {
    @ViewChild(SidebarAdminComponent) sidebarAdminComponent!: SidebarAdminComponent;


    visiblemanual! : boolean

    showDialogManual(){
        this.visiblemanual = !this.visiblemanual
      }

}
import { Component, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DropdownMenuComponent } from "../drop-down/drop-down.component";
import { UserManualComponent } from "../user-manual/user-manual.component";
import { SidebarAdminComponent } from "../sidebar-admin/sidebar-admin.component";




@Component({
    selector: 'app-navbarimpadmin',
    standalone: true,
    templateUrl: './navbarimpadmin.component.html',
    styleUrl: './navbarimpadmin.component.css',
    imports: [ButtonModule, DropdownMenuComponent, UserManualComponent, SidebarAdminComponent]
})
export class navbarImpAdminComponent{
  @ViewChild(SidebarAdminComponent) sidebarAdminComponent!: SidebarAdminComponent;


}
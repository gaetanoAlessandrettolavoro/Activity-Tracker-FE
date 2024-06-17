import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button'
import { RouterLink } from '@angular/router';
import { DropdownMenuComponent } from "../drop-down/drop-down.component";
import { UserManualComponent } from '../user-manual/user-manual.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-navbar-admin',
    standalone: true,
    templateUrl: './navbar-admin.component.html',
    styleUrl: './navbar-admin.component.css',
    imports: [MenubarModule, ButtonModule, RouterLink, DropdownMenuComponent,UserManualComponent,CommonModule]
})
export class NavbarAdminComponent {

    visiblemanual! : boolean

    showDialogManual(){
        this.visiblemanual = !this.visiblemanual
      }

}

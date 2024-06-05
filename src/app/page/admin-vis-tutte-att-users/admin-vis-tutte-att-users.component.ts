import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DropdownMenuComponent } from "../../componenti/drop-down/drop-down.component";
import { UserManualComponent } from "../../componenti/user-manual/user-manual.component";

@Component({
    selector: 'app-admin-vis-tutte-att-users',
    standalone: true,
    templateUrl: './admin-vis-tutte-att-users.component.html',
    styleUrl: './admin-vis-tutte-att-users.component.css',
    imports: [ButtonModule, RouterLink, DropdownMenuComponent, UserManualComponent]
})
export class AdminVisTutteAttUsersComponent {

}
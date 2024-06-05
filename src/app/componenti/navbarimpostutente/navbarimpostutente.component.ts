import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { UserManualComponent } from '../user-manual/user-manual.component';
import { DropdownMenuComponent } from "../drop-down/drop-down.component";

@Component({
    selector: 'app-navbarimpostutente',
    standalone: true,
    templateUrl: './navbarimpostutente.component.html',
    styleUrl: './navbarimpostutente.component.css',
    imports: [ButtonModule, UserManualComponent, DropdownMenuComponent]
})
export class NavbarimpostutenteComponent {

}


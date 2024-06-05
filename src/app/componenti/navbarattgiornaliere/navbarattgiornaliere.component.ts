import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button'
import { UserManualComponent } from '../user-manual/user-manual.component';
import { DropdownMenuComponent } from "../drop-down/drop-down.component";

@Component({
    selector: 'navbarattgiornaliere',
    templateUrl: './navbarattgiornaliere.component.html',
    styleUrls: ['./navbarattgiornaliere.component.css'],
    standalone: true,
    imports: [MenubarModule, ButtonModule, UserManualComponent, DropdownMenuComponent]
})
export class NavbarComponent{


}
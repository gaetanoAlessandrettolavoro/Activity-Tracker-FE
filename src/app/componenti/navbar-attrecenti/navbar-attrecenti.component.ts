import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { UserManualComponent } from '../user-manual/user-manual.component';
import { RouterLink } from '@angular/router';
import { DropdownMenuComponent } from "../drop-down/drop-down.component";
import { ServiceloginService } from '../../servizi/servicelogin.service';

@Component({
    selector: 'app-navbar-attrecenti',
    standalone: true,
    templateUrl: './navbar-attrecenti.component.html',
    styleUrls: ['./navbar-attrecenti.component.css'],
    imports: [MenubarModule, ButtonModule, UserManualComponent, RouterLink, DropdownMenuComponent]
})
export class NavbarAttrecentiComponent implements OnInit {

    constructor(private servizio: ServiceloginService) {}

    firstName! : string
    lastName! : string

    ngOnInit() {
        this.servizio.getUsernamelastNameUser().subscribe({
            next: (result: any) => {
                this.firstName = result.data.firstName
                this.lastName = result.data.lastName
            },
            error: (error: any) => {
                console.error('Si è verificato un errore:', error);
            }
        });
    }
}
import { Component, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { UserManualComponent } from '../user-manual/user-manual.component';
import { DropdownMenuComponent } from "../drop-down/drop-down.component";
import { ServiceloginService } from '../../servizi/servicelogin.service';
import { SidebarComponent } from "../sidebar/sidebar.component";


@Component({
    selector: 'app-navbarimpostutente',
    standalone: true,
    templateUrl: './navbarimpostutente.component.html',
    styleUrl: './navbarimpostutente.component.css',
    imports: [ButtonModule, UserManualComponent, DropdownMenuComponent, SidebarComponent]
})
export class NavbarimpostutenteComponent {
    @ViewChild(SidebarComponent) sidebarComponent!: SidebarComponent;


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
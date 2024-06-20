import { Component, OnInit, ViewChild } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { UserManualComponent } from '../user-manual/user-manual.component';
import { RouterLink } from '@angular/router';

import { SidebarComponent } from "../sidebar/sidebar.component";
import { DropDownUserComponent } from "../drop-down-user/drop-down-user.component";
import { UserServiceService } from '../../servizi/user-service.service';

interface UserNameResponse {
    data: {
        firstName: string;
        lastName: string;
    };
}

@Component({
    selector: 'app-navbar-attrecenti',
    standalone: true,
    templateUrl: './navbar-attrecenti.component.html',
    styleUrls: ['./navbar-attrecenti.component.css'],
    imports: [MenubarModule, ButtonModule, UserManualComponent, RouterLink, SidebarComponent, DropDownUserComponent]
})
export class NavbarAttrecentiComponent implements OnInit {
    @ViewChild(SidebarComponent) sidebarComponent!: SidebarComponent;

    firstName: string = '';
    lastName: string = '';

    constructor(private userService: UserServiceService) {}

    ngOnInit() {
        this.userService.getMe().subscribe({
            next: (result: UserNameResponse) => {
                this.firstName = result.data.firstName;
                this.lastName = result.data.lastName;
            },
            error: (error: any) => {
                console.error('Si è verificato un errore:', error);
            }
        });
    }
}

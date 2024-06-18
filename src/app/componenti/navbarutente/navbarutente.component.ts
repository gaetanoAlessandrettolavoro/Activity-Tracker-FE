import { Component, ViewChild } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button'
import { RouterLink } from '@angular/router';
import { DropdownMenuComponent } from "../drop-down/drop-down.component";
import { CommonModule } from '@angular/common';
import { UserTaskCreationComponent } from '../user-task-creation/user-task-creation.component';
import { UserManualComponent } from '../user-manual/user-manual.component';
import { SidebarComponent } from "../sidebar/sidebar.component";


@Component({
    selector: 'navbarutente',
    templateUrl: './navbarutente.component.html',
    styleUrls: ['./navbarutente.component.css'],
    standalone: true,
    imports: [MenubarModule, ButtonModule, RouterLink, DropdownMenuComponent, CommonModule, UserTaskCreationComponent, UserManualComponent, SidebarComponent]
})
export class NavbarComponent{
  @ViewChild(SidebarComponent) sidebarComponent!: SidebarComponent;


    visible = false
    visiblemanual = false

    showDialog(){
      this.visible = !this.visible
    }

    showDialogManual(){
      this.visiblemanual = !this.visiblemanual
    }


}

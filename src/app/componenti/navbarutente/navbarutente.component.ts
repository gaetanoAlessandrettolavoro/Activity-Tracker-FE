import { Component, ViewChild } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button'
import { RouterLink } from '@angular/router';
import { DropdownMenuComponent } from "../drop-down/drop-down.component";
import { CommonModule } from '@angular/common';
import { UserTaskCreationComponent } from '../user-task-creation/user-task-creation.component';
<<<<<<< HEAD
import { UserManualComponent } from '../user-manual/user-manual.component';
=======
import { SidebarComponent } from "../sidebar/sidebar.component";

>>>>>>> 3da0bd1 (feat(sideBar): Add and implement sidebar)

@Component({
    selector: 'navbarutente',
    templateUrl: './navbarutente.component.html',
    styleUrls: ['./navbarutente.component.css'],
    standalone: true,
<<<<<<< HEAD
    imports: [MenubarModule, ButtonModule, RouterLink, DropdownMenuComponent,CommonModule,UserTaskCreationComponent,UserManualComponent]
=======
    imports: [MenubarModule, ButtonModule, RouterLink, DropdownMenuComponent, CommonModule, UserTaskCreationComponent, SidebarComponent]
>>>>>>> 3da0bd1 (feat(sideBar): Add and implement sidebar)
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

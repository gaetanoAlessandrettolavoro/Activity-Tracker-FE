import { Component, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SidebarAdminComponent } from '../sidebar-admin/sidebar-admin.component';

@Component({
  selector: 'app-navbarimpadmin',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './navbarimpadmin.component.html',
  styleUrl: './navbarimpadmin.component.css'
})
export class navbarImpAdminComponent{
  @ViewChild(SidebarAdminComponent) sidebarAdminComponent!: SidebarAdminComponent;


}
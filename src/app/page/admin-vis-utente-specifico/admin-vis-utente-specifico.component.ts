import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule, DatePipe, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditActivityButtonComponent } from '../../componenti/edit-activity-button/edit-activity-button.component';
import { Activity } from '../../model/activityModel';

@Component({
  selector: 'app-admin-vis-utente-specifico',
  standalone: true,
  imports: [TableModule, ButtonModule, CommonModule,FormsModule,EditActivityButtonComponent, NgIf, DatePipe],
  templateUrl: './admin-vis-utente-specifico.component.html',
  styleUrls: ['./admin-vis-utente-specifico.component.css']
})
export class AdminVisUtenteSpecificoComponent {
  activities: Activity[] = [
    { taskName: 'attività1', activityDate:new Date(2024, 0, 1), startTime: new Date(2024, 0, 1, 9, 0), endTime: new Date(2024, 0, 1, 18, 0), notes: 'note1' },
  
  ];

  cols = [
    { field: 'taskName', header: 'Attività' },
    { field: 'activityDate', header: 'Data'},
    { field: 'startTime', header: 'Orario di inizio' },
    { field: 'endTime', header: 'Orario di fine' },
    { field: 'notes', header: 'Note' },
    { field: 'button', header: '' }
  ];
  
}
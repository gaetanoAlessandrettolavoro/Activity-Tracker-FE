import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditActivityButtonComponent } from '../../componenti/edit-activity-button/edit-activity-button.component';

@Component({
  selector: 'app-admin-vis-utente-specifico',
  standalone: true,
  imports: [TableModule, ButtonModule, CommonModule,FormsModule,EditActivityButtonComponent],
  templateUrl: './admin-vis-utente-specifico.component.html',
  styleUrls: ['./admin-vis-utente-specifico.component.css']
})
export class AdminVisUtenteSpecificoComponent {
  activities = [
    { activity: 'attività1',data:'01/01/2024', orarioInizio: '09:00', orarioFine: '18:00', note: 'note1' },
  
  ];

  cols = [
    { field: 'activity', header: 'Attività' },
    { field: 'data', header: 'Data'},
    { field: 'orarioInizio', header: 'Orario di inizio' },
    { field: 'orarioFine', header: 'Orario di fine' },
    { field: 'note', header: 'Note' },
    { field: 'button', header: '' }
  ];
  
}
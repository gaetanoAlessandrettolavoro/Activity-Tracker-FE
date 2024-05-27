import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditActivityButtonComponent } from '../../../componenti/edit-activity-button/edit-activity-button.component';

@Component({
  selector: 'app-attivita-recenti-utente',
  standalone: true,
  imports: [TableModule, ButtonModule, CommonModule,FormsModule, EditActivityButtonComponent],
  templateUrl: './attivita-recenti-utente.component.html',
  styleUrls: ['./attivita-recenti-utente.component.css']
})
export class AttivitaRecentiUtenteComponent {
  activities = [
    { activity: 'attività1',data:'01/01/2024', orarioInizio: '09:00', orarioFine: '18:00', note: 'note1' },
    { activity: 'attività2',data:'01/02/2024', orarioInizio: '09:00', orarioFine: '18:00', note: 'note2' },
    { activity: 'attività3',data:'01/03/2024', orarioInizio: '09:00', orarioFine: '18:00', note: 'note3' },
  ];

  cols = [
    { field: 'activity', header: 'Attività' },
    { field: 'data', header: 'Data'},
    { field: 'orarioInizio', header: 'Orario di inizio' },
    { field: 'orarioFine', header: 'Orario di fine' },
    { field: 'note', header: 'Note' },
    { field: 'button', header: '' }
  ];
  filteredActivities = [...this.activities];
  searchText: string = '';
  fromDate: string = '';
  toDate: string = '';

  filterActivities() {
    this.filteredActivities = this.activities.filter(activity => {
      const matchesText = !this.searchText || activity.activity.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesDate = this.isDateInRange(activity.data);
      return matchesText && matchesDate;
    });
  }

  isDateInRange(date: string): boolean {
    const activityDateParts = date.split('/');
    const activityDate = new Date(+activityDateParts[2], +activityDateParts[1] - 1, +activityDateParts[0]);
    const from = this.fromDate ? new Date(this.fromDate) : null;
    const to = this.toDate ? new Date(this.toDate) : null;

    if (from && to) {
      return activityDate >= from && activityDate <= to;
    } else if (from) {
      return activityDate >= from;
    } else if (to) {
      return activityDate <= to;
    } else {
      return true;
    }
  }
}
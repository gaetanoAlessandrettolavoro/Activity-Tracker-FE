import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../componenti/footer/footer.component';

@Component({
  selector: 'app-admin-vis-user',
  standalone: true,
  imports: [TableModule, ButtonModule, CommonModule, FormsModule,FooterComponent],
  templateUrl: './admin-vis-users.component.html',
  styleUrls: ['./admin-vis-users.component.css']
})
export class AdminvisuserComponent {
  activities = [
    { name: 'Mario', surname: 'Rossi', codiceFiscale: 'RSSMRA85M01H501Z', email: 'mario.rossi@example.com' },
    { name: 'Luca', surname: 'Bianchi', codiceFiscale: 'BNCGLC70L01H501F', email: 'luca.bianchi@example.com' },
    { name: 'Giulia', surname: 'Verdi', codiceFiscale: 'VRDGLL80A41H501H', email: 'giulia.verdi@example.com' },
  ];

  cols = [
    { field: 'name', header: 'Nome' },
    { field: 'surname', header: 'Cognome' },
    { field: 'codiceFiscale', header: 'Codice Fiscale' },
    { field: 'email', header: 'Email' },
    { field: 'button', header: '' }
  ];

  filteredActivities = [...this.activities];
  searchText: string = '';
  fromDate: string = '';
  toDate: string = '';

  filterActivities() {
    this.filteredActivities = this.activities.filter(activity => {
      const matchesText = !this.searchText ||
        activity.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        activity.surname.toLowerCase().includes(this.searchText.toLowerCase()) ||
        activity.codiceFiscale.toLowerCase().includes(this.searchText.toLowerCase()) ||
        activity.email.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesDate = true; // Always true since we're not filtering by date anymore
      return matchesText && matchesDate;
    });
  }
}

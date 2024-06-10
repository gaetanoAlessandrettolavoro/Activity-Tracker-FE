import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../componenti/footer/footer.component';
import { GetusersService } from '../../servizi/getusers.service';
import { animate } from '@angular/animations';

interface User {
  name: string;
  surname: string;
  codiceFiscale: string;
  email: string;
}

@Component({
  selector: 'app-admin-vis-user',
  standalone: true,
  imports: [TableModule, ButtonModule, CommonModule, FormsModule, FooterComponent],
  templateUrl: './admin-vis-users.component.html',
  styleUrls: ['./admin-vis-users.component.css']
})
export class AdminvisuserComponent implements OnInit {

  constructor(private users: GetusersService){}
  activities: User[] = [];

  cols = [
    { field: 'name', header: 'Nome' },
    { field: 'surname', header: 'Cognome' },
    { field: 'codiceFiscale', header: 'Codice Fiscale' },
    { field: 'email', header: 'Email' },
  ];

  filteredActivities: User[] = [];
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

  ngOnInit(): void {
    this.users.getData().subscribe((data: any) => {
      data.data.document.forEach((item: any) => {7
        console.log(item)
        this.activities.push({
          name: item.firstName,
          surname: item.lastName,
          codiceFiscale: item.codiceFiscale,
          email: item.email,
        });
      });
      // Filtro le attività dopo averle ricevute
      this.filterActivities();
    });
  }
}

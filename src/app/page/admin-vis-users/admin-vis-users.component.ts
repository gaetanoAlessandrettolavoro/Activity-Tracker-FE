import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../componenti/footer/footer.component';
import { GetusersService } from '../../servizi/getusers.service';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ActivityUserService } from '../../servizi/activity-user.service';

interface User {
  id: string;
  name: string;
  surname: string;
  codiceFiscale: string;
  email: string;
}

@Component({
  selector: 'app-admin-vis-user',
  standalone: true,
  imports: [TableModule, ButtonModule, CommonModule, FooterComponent, PaginatorModule, InputTextModule, FormsModule],
  templateUrl: './admin-vis-users.component.html',
  styleUrls: ['./admin-vis-users.component.css']
})
export class AdminvisuserComponent implements OnInit {

  constructor(private users: GetusersService, private activityUserService: ActivityUserService) {}
  activities: User[] = [];
  userActivities: any[] = [];
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

  limit!: number;
  first: number = 0;
  rows: number = 10;

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
      data.data.document.forEach((item: any) => {
        console.log(item);
        this.activities.push({
          id: item._id,
          name: item.firstName,
          surname: item.lastName,
          codiceFiscale: item.codiceFiscale,
          email: item.email,
        });
      });
      this.filterActivities();
    });
  }
  getActivity(id: string) {
    const userId = id;
    this.activityUserService.getActivities(userId).subscribe((result: any) => {
      this.userActivities = result;
      console.log(result)
    });
    console.log(id);
  }

  onPageChange(event: any) {
    const pageNumber = (event.page + 1);
    this.activities = [];
    this.users.getData25(pageNumber, this.limit).subscribe((data: any) => {
      data.data.document.forEach((item: any) => {
        console.log(item);
        this.activities.push({
          id: item._id,
          name: item.firstName,
          surname: item.lastName,
          codiceFiscale: item.codiceFiscale,
          email: item.email,
        });
      });
      this.filterActivities();
    });
    console.log(pageNumber);
  }

  changeLimit() {
    const currentPage = this.first / this.rows + 1; // Calcola la pagina corrente
    this.users.getData25(currentPage, this.limit).subscribe((data: any) => {
      this.activities = [];
      data.data.document.forEach((item: any) => {
        console.log(item);
        this.activities.push({
          id: item._id,
          name: item.firstName,
          surname: item.lastName,
          codiceFiscale: item.codiceFiscale,
          email: item.email,
        });
      });
      this.filterActivities();
    });
    console.log(this.limit);
  }


}

import { Component, OnInit, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EditActivityButtonComponent } from '../../../componenti/edit-activity-button/edit-activity-button.component';
import { NavbarAttrecentiComponent } from '../../../componenti/navbar-attrecenti/navbar-attrecenti.component';
import { FooterComponent } from '../../../componenti/footer/footer.component';
import { FilterService } from 'primeng/api';
import { Activity } from '../../../models/activityModel';
import { DeleteActivityButtonComponent } from '../../../componenti/delete-activity-button/delete-activity-button.component';
import { GetActivityUserService } from '../../../servizi/get-activity.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-attivita-recenti-utente',
  standalone: true,
  templateUrl: './attivita-recenti-utente.component.html',
  styleUrls: ['./attivita-recenti-utente.component.css'],
  imports: [
    TableModule,
    ButtonModule,
    CommonModule,
    ReactiveFormsModule,
    EditActivityButtonComponent,
    NavbarAttrecentiComponent,
    FooterComponent,
    DeleteActivityButtonComponent,
  ],
})
export class AttivitaRecentiUtenteComponent implements OnInit {
  rowItems: Activity[] = [];
  filteredItems: Activity[] = [];
  filterForm: FormGroup;

  router = inject(Router);

  cols = [
    { field: 'taskName', header: 'Attività' },
    { field: 'activityDate', header: 'Data' },
    { field: 'startTime', header: 'Orario di inizio' },
    { field: 'endTime', header: 'Orario di fine' },
    { field: 'notes', header: 'Note' },
  ];

  constructor(
    private filterService: FilterService,
    private getActivityUserService: GetActivityUserService,
    private route: ActivatedRoute,
  ) {
    this.filterForm = new FormGroup({
      searchText: new FormControl(''),
      fromDate: new FormControl(''),
      toDate: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.getActivityUserService.getData().subscribe((data) => {
      data.data.userActivities.forEach((item: Activity) => {
        this.rowItems.push({
          taskID: item.taskID,
          taskName: item.taskName,
          activityDate: new Date(item.activityDate), // Updated
          startTime: new Date(item.startTime), // Updated
          endTime: new Date(item.endTime), // Updated
          notes: item.notes,
          _id: item._id,
        });
      });
      this.filteredItems = [...this.rowItems];
    });

    this.filterForm.valueChanges.subscribe(() => {
      this.filterActivities();
    });
  }

  filterActivities() {
    const { searchText, fromDate, toDate } = this.filterForm.value;
    this.filteredItems = this.rowItems.filter((item) => {
      const matchesText =
        !searchText ||
        item.taskName.toLowerCase().includes(searchText.toLowerCase());
<<<<<<< HEAD
=======
      const itemDate = new Date(item.activityDate);
      const date = this.formatDate(itemDate); 
>>>>>>> 3da0bd1 (feat(sideBar): Add and implement sidebar)
      const matchesDate =
        !fromDate && !toDate
          ? true
          : this.isDateInRange(item.activityDate, fromDate, toDate); // Updated
      return matchesText && matchesDate;
    });
  }
  
  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  

  isDateInRange(date: Date, fromDate: string, toDate: string): boolean {
    // Updated
    const activityDate = new Date(date);

    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    if (from) {
      from.setHours(0, 0, 0, 0);
    }
    if (to) {
      to.setHours(23, 59, 59, 999);
    }

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

  reload() {
    window.location.reload();
  }
}

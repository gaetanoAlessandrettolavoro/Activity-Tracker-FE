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
    private route: ActivatedRoute
  ) {
    this.filterForm = new FormGroup({
      searchText: new FormControl(''),
      fromDate: new FormControl(''),
      toDate: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.getActivityUserService.getData().subscribe((data) => {
      data.data.userActivities.forEach((item: any) => {
        if (item.isActive === true) {
          this.rowItems.push({
            taskID: item.taskID,
            taskName: item.taskName,
            activityDate: item.activityDate,
            startTime: item.startTime,
            endTime: item.endTime,
            notes: item.notes,
            _id: item._id,
          });
        }
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
      let itemDay!: string;
      let itemMonth!: string;
      let itemYear: string = item.activityDate.getFullYear().toString();
      if (item.activityDate.getDate() >= 10) {
        itemDay = item.activityDate.getDate().toString();
      } else {
        itemDay = '0' + item.activityDate.getDate().toString();
      }
      if (item.activityDate.getMonth() >= 9) {
        itemMonth = (item.activityDate.getMonth() + 1).toString();
      } else {
        itemMonth = '0' + (item.activityDate.getMonth() + 1).toString();
      }
      console.log(itemMonth);
      const date = itemDay + '/' + itemMonth + '/' + itemYear;
      console.log(date);
      const matchesDate =
        !fromDate && !toDate
          ? true
          : this.isDateInRange(date, fromDate, toDate);
      return matchesText && matchesDate;
    });
  }

  isDateInRange(date: string, fromDate: string, toDate: string): boolean {
    const [day, month, year] = date.split('/').map(Number);
    const activityDate = new Date(year, month - 1, day);

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
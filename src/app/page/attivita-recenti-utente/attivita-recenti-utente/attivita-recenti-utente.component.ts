import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EditActivityButtonComponent } from '../../../componenti/edit-activity-button/edit-activity-button.component';
import { NavbarAttrecentiComponent } from "../../../componenti/navbar-attrecenti/navbar-attrecenti.component";
import { FooterComponent } from "../../../componenti/footer/footer.component";
import { FilterService } from 'primeng/api';

interface IRowItem {
  activity: string;
  data: string;
  orarioInizio: string;
  orarioFine: string;
  note: string;
}

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
    FooterComponent
  ]
})
export class AttivitaRecentiUtenteComponent implements OnInit {
  rowItems: IRowItem[] = [];
  filteredItems: IRowItem[] = [];
  filterForm: FormGroup;

  cols = [
    { field: 'activity', header: 'Attività' },
    { field: 'data', header: 'Data' },
    { field: 'orarioInizio', header: 'Orario di inizio' },
    { field: 'orarioFine', header: 'Orario di fine' },
    { field: 'note', header: 'Note' },
  ];

  constructor(private filterService: FilterService) {
    this.filterForm = new FormGroup({
      searchText: new FormControl(''),
      fromDate: new FormControl(''),
      toDate: new FormControl('')
    });
  }

  ngOnInit() {
    const newRow: IRowItem[] = [
      { activity: 'attività1', data: '01/01/2024', orarioInizio: '09:00', orarioFine: '18:00', note: 'note1' },
      { activity: 'attività2', data: '01/02/2024', orarioInizio: '09:00', orarioFine: '18:00', note: 'note2' },
      { activity: 'attività3', data: '01/03/2024', orarioInizio: '09:00', orarioFine: '18:00', note: 'note3' },
    ];

    this.rowItems = newRow;
    this.filteredItems = newRow;

    this.filterForm.valueChanges.subscribe(() => {
      this.filterActivities();
    });
  }

  filterActivities() {
    const { searchText, fromDate, toDate } = this.filterForm.value;
    this.filteredItems = this.rowItems.filter(item => {
      const matchesText = !searchText || item.activity.toLowerCase().includes(searchText.toLowerCase());
      const matchesDate = !fromDate && !toDate ? true : this.isDateInRange(item.data, fromDate, toDate);
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
}
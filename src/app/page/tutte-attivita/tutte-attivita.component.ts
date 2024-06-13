import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import {
  RowToggler,
  TableModule,
  TableRowCollapseEvent,
  TableRowExpandEvent,
} from 'primeng/table';
import { EditActivityButtonComponent } from '../../componenti/edit-activity-button/edit-activity-button.component';
import { ButtonModule } from 'primeng/button';
import { Activity } from '../../models/activityModel';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FilterService } from 'primeng/api';
import { AdminVisTutteAttUsersComponent } from '../../componenti/admin-vis-tutte-att-users/admin-vis-tutte-att-users.component';
import { FooterComponent } from '../../componenti/footer/footer.component';
import { GetusersService } from '../../servizi/getusers.service';
import { TutteAttivitàUserService } from '../../servizi/tutte-attività-user.service';

interface rowItem {
  nome: string;
  cognome: string;
  codiceFiscale: string;
  email: string;
  propic: string;
  activity: Activity[];
}

@Component({
  selector: 'tutte-attivita',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    EditActivityButtonComponent,
    ButtonModule,
    RippleModule,
    InputTextModule,
    FormsModule,
    AdminVisTutteAttUsersComponent,
    FooterComponent
  ],
  templateUrl: './tutte-attivita.component.html',
  styleUrl: './tutte-attivita.component.css',
  providers: [RowToggler],
})
export class TutteAttivitaComponent implements OnInit {
  originalRowItems: rowItem[] = [];
  rowItems: rowItem[] = [];

  textFilter = signal<string>('');
  isFiltered = signal<boolean>(false);

  expandedRows = {};

  constructor(private filterService: FilterService, private users: GetusersService, private activities:TutteAttivitàUserService) {}

  ngOnInit() {
    //QUI ANDRà UN METODO CHE MAN MANO CHE ARRIVANO I DATI DAL BE POPOLI LA VARIABILE rows
    this.activities.recuperaTutteLeAttivita().subscribe((result) => console.log(result))
    const newRows: rowItem[] = [
      {
        nome: 'Paolo',
        cognome: 'Bitta',
        codiceFiscale: 'BTTPLA00A05H501A',
        email: 'marioross1@email.it',
        propic:
          'https://i.pinimg.com/200x150/60/13/a3/6013a33f806d8d74f43ee2eb565ff4dc.jpg',
        activity: [
          {
            taskName: 'Task1',
            activityDate: new Date(2021, 9, 2),
            startTime: new Date(2021, 9, 2, 8, 0),
            endTime: new Date(2021, 9, 2, 11, 0),
            notes: 'Note task1',
            taskID: '1',
          },
        ],
      },
      {
        nome: 'Luca',
        cognome: 'Nervi',
        codiceFiscale: 'NRVLCA00A01H501A',
        email: 'luca@verd.i',
        propic:
          'https://i.pinimg.com/200x150/60/13/a3/6013a33f806d8d74f43ee2eb565ff4dc.jpg',
        activity: [
          {
            taskName: 'Task2',
            activityDate: new Date(2021, 9, 2),
            startTime: new Date(2021, 9, 2, 9, 0),
            endTime: new Date(2021, 9, 2, 12, 0),
            notes: 'Note task2',
            taskID: '2',
          },
        ],
      },
    ];
    this.originalRowItems = newRows;
    this.rowItems = newRows;
  }

  onClickSetFilter() {
    this.isFiltered.set(true);
    const newRowItems = this.originalRowItems.filter((row) => {
      return (
        this.filterService.filters['contains'](row.nome, this.textFilter()) ||
        this.filterService.filters['contains'](
          row.cognome,
          this.textFilter(),
        ) ||
        this.filterService.filters['contains'](
          row.activity[0].taskName,
          this.textFilter(),
        )
      );
    });
    this.rowItems = newRowItems;
  }

  onClickRemoveFilter() {
    this.isFiltered.set(false);
    this.textFilter.set('');
    this.rowItems = this.originalRowItems;
  }

  getUsers(){
    this.users.getData().subscribe((data: any) => {
      console.log(data);
    });
  }
}
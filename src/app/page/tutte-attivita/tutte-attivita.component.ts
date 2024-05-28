import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  RowToggler,
  TableModule,
  TableRowCollapseEvent,
  TableRowExpandEvent,
} from 'primeng/table';
import { EditActivityButtonComponent } from '../../componenti/edit-activity-button/edit-activity-button.component';
import { ButtonModule } from 'primeng/button';
import { Activity } from '../../model/activityModel';
import { RippleModule } from 'primeng/ripple';

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
    RippleModule
  ],
  templateUrl: './tutte-attivita.component.html',
  styleUrl: './tutte-attivita.component.css',
  providers: [RowToggler],
})
export class TutteAttivitaComponent implements OnInit {
  rowItems: rowItem[] = [];

  expandedRows = {};

  constructor() {}

  ngOnInit() {
    //QUI ANDRà UN METODO CHE MAN MANO CHE ARRIVANO I DATI DAL BE POPOLI LA VARIABILE rows
    const newRows: rowItem[] = [
      {
        nome: 'Paolo',
        cognome: 'Bitta',
        codiceFiscale: 'BTTPLA00A05H501A',
        email: 'marioross1@email.it',
        propic:
          'https://i.pinimg.com/200x150/60/13/a3/6013a33f806d8d74f43ee2eb565ff4dc.jpg',
        activity: [{
          taskName: 'Task1',
          activityDate: new Date(2021, 9, 2),
          startTime: '08:00',
          endTime: '09:00',
          notes: 'Note task1',
        }],
      },
      {
        nome: 'Luca',
        cognome: 'Nervi',
        codiceFiscale: 'NRVLCA00A01H501A',
        email: 'luca@verd.i',
        propic:
          'https://i.pinimg.com/200x150/60/13/a3/6013a33f806d8d74f43ee2eb565ff4dc.jpg',
        activity: [{
          taskName: 'Task2',
          activityDate: new Date(2021, 9, 2),
          startTime: '09:00',
          endTime: '10:00',
          notes: 'Note task2',
        }],
      },
    ];
    this.rowItems = newRows;
  }

  onRowExpand(event: TableRowExpandEvent) {
  }

  onRowCollapse(event: TableRowCollapseEvent) {
  }
}

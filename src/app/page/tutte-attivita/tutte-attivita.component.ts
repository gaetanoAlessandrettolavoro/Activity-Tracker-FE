import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import {
  TableModule,
  TableRowCollapseEvent,
  TableRowExpandEvent,
} from 'primeng/table';
import { EditActivityButtonComponent } from '../../componenti/edit-activity-button/edit-activity-button.component';
import { ButtonModule } from 'primeng/button';

interface rowItem {
  nome: string;
  cognome: string;
  codiceFiscale: string;
  email: string;
  propic: string;
  activity: [
    {
      taskName: string;
      activityDate: Date;
      startTime: string;
      endTime: string;
      notes: string;  
    }
  ]
}

@Component({
  selector: 'tutte-attivita',
  standalone: true,
  imports: [TableModule, CommonModule, EditActivityButtonComponent, ButtonModule],
  templateUrl: './tutte-attivita.component.html',
  styleUrl: './tutte-attivita.component.css',
  providers: [MessageService],
})
export class TutteAttivitaComponent implements OnInit {
  rows: rowItem[] = [];
  // rows = signal<rowItem[]>([]);

  expandedRows = {}

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    //QUI ANDRà UN METODO CHE MAN MANO CHE ARRIVANO I DATI DAL BE POPOLI LA VARIABILE rows
    const newRows: rowItem[] = [
      {
        nome: 'Mario',
        cognome: 'Rossi',
        codiceFiscale: 'RSSMRA00A01H501A',
        email: 'marioross1@email.it',
        propic: 'https://i.pinimg.com/200x150/60/13/a3/6013a33f806d8d74f43ee2eb565ff4dc.jpg',
        activity: [
          {
            taskName: 'Task1',
            activityDate: new Date(2021, 9, 2),
            startTime: '08:00',
            endTime: '09:00',
            notes: 'Note task1',
          }
        ],
      },
      {
        nome: 'Luca',
        cognome: 'Verdi',
        codiceFiscale: 'VRDLCA00A01H501A',
        email: 'luca@verd.i',
        propic: 'https://i.pinimg.com/200x150/60/13/a3/6013a33f806d8d74f43ee2eb565ff4dc.jpg',
        activity: [
          {
            taskName: 'Task2',
            activityDate: new Date(2021, 9, 2),
            startTime: '09:00',
            endTime: '10:00',
            notes: 'Note task2',
          }
        ],
      },
    ]
    this.rows = newRows;
  }

  onRowExpand(event: TableRowExpandEvent) {
    this.messageService.add({
      severity: 'info',
      summary: 'Product Expanded',
      detail: event.data.name,
      life: 3000,
    });
  }

  onRowCollapse(event: TableRowCollapseEvent) {
    this.messageService.add({
      severity: 'success',
      summary: 'Product Collapsed',
      detail: event.data.name,
      life: 3000,
    });
  }
}

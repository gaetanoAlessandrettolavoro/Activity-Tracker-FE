import { Component, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms'; // Assicurati di importare FormsModule

@Component({
  selector: 'app-dropdown-qualifica',
  standalone: true,
  imports: [DropdownModule, FormsModule],
  templateUrl: './dropdown-qualifica.component.html',
  styleUrls: ['./dropdown-qualifica.component.css']
})
export class DropdownQualificaComponent implements OnInit {
  items: { label: string, value: string }[] = [];
  selectedValue: string | null = null; // Inizializzazione a null

  ngOnInit() {
    this.items = [
      { label: 'Lavoratori generici', value: 'Lavoratori generici' },
      { label: 'Operai comuni', value: 'Operai comuni' },
      { label: 'Operai qualificati', value: 'Operai qualificati' },
      { label: 'Addetti alle macchine utensili semplici', value: 'Addetti alle macchine utensili semplici' },
      { label: 'Operai specializzati', value: 'Operai specializzati' },
      { label: 'Addetti a macchine utensili complesse', value: 'Addetti a macchine utensili complesse' },
      { label: 'Operai specializzati di alta qualificazione', value: 'Operai specializzati di alta qualificazione' },
      { label: 'Manutentori', value: 'Manutentori' },
      { label: 'Addetti a linee di produzione automatizzate', value: 'Addetti a linee di produzione automatizzate' },
      { label: 'Tecnici operativi', value: 'Tecnici operativi' },
      { label: 'Capi squadra', value: 'Capi squadra' },
      { label: 'Addetti alla programmazione di macchine CNC (controllo numerico computerizzato)', value: 'Addetti alla programmazione di macchine CNC' },
      { label: 'Tecnici esperti', value: 'Tecnici esperti' },
      { label: 'Capi reparto', value: 'Capi reparto' },
      { label: 'Programmatori CNC avanzati', value: 'Programmatori CNC avanzati' },
      { label: 'Quadri tecnici', value: 'Quadri tecnici' },
      { label: 'Responsabili di area', value: 'Responsabili di area' },
      { label: 'Supervisori di produzione', value: 'Supervisori di produzione' },
      { label: 'Dirigenti tecnici', value: 'Dirigenti tecnici' },
      { label: 'Responsabili di settore', value: 'Responsabili di settore' },
      { label: 'Ingegneri di processo', value: 'Ingegneri di processo' },
      { label: 'Dirigenti di alto livello', value: 'Dirigenti di alto livello' },
      { label: 'Direttori tecnici', value: 'Direttori tecnici' },
      { label: 'Project manager senior', value: 'Project manager senior' }
    ];
  }
}


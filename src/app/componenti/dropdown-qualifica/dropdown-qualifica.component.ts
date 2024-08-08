import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  items:  string []= [];
 
@Output()selected = new EventEmitter<string>();

  ngOnInit() {
    this.items = [
       'Lavoratori generici',
      'Operai comuni',
     'Operai qualificati', 
      'Addetti alle macchine utensili semplici',
       'Operai specializzati', 
       'Addetti a macchine utensili complesse',
      'Operai specializzati di alta qualificazione',
       'Manutentori',
       'Addetti a linee di produzione automatizzate',
       'Tecnici operativi', 
       'Capi squadra',
       'Addetti alla programmazione di macchine CNC (controllo numerico computerizzato)',
       'Tecnici esperti', 
       'Capi reparto',
       'Programmatori CNC avanzati', 
       'Quadri tecnici', 
       'Responsabili di area',
       'Supervisori di produzione',
       'Dirigenti tecnici',
       'Responsabili di settore', 
       'Ingegneri di processo', 
       'Dirigenti di alto livello',
       'Direttori tecnici', 
       'Project manager senior',
    ];
  }

  onChange(event:any){
    this.selected.emit(event.value);
  }
}
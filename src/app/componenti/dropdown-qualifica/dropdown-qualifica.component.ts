import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-dropdown-qualifica',
  standalone: true,
  imports: [FormsModule,DropdownModule],
  templateUrl: './dropdown-qualifica.component.html',
  styleUrl: './dropdown-qualifica.component.css'
})
export class DropdownQualificaComponent {
   items: MenuItem[] | undefined;

   ngOnInit() {
    this.items = [
        {
            items: [
                { label: 'Lavoratori generici' },
                { label: 'Operai comuni' }
            ]
        },
        {

            items: [
                { label: 'Operai qualificati' },
                { label: 'Addetti alle macchine utensili semplici' }
            ]
        },
        {
    
            items: [
                { label: 'Operai specializzati' },
                { label: 'Addetti a macchine utensili complesse' }
            ]
        },
        {
    
            items: [
                { label: 'Operai specializzati di alta qualificazione' },
                { label: 'Manutentori' },
                { label: 'Addetti a linee di produzione automatizzate' }
            ]
        },
        {
    
            items: [
                { label: 'Tecnici operativi' },
                { label: 'Capi squadra' },
                { label: 'Addetti alla programmazione di macchine CNC (controllo numerico computerizzato)' }
            ]
        },
        {
        
            items: [
                { label: 'Tecnici esperti' },
                { label: 'Capi reparto' },
                { label: 'Programmatori CNC avanzati' }
            ]
        },
        {
           
            items: [
                { label: 'Quadri tecnici' },
                { label: 'Responsabili di area' },
                { label: 'Supervisori di produzione' }
            ]
        },
        {
          
            items: [
                { label: 'Dirigenti tecnici' },
                { label: 'Responsabili di settore' },
                { label: 'Ingegneri di processo' }
            ]
        },
        {
          
            items: [
                { label: 'Dirigenti di alto livello' },
                { label: 'Direttori tecnici' },
                { label: 'Project manager senior' }
            ]
        }
    ];
}
}

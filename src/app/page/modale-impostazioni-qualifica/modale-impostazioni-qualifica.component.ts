import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-modale-impostazioni-qualifica',
  standalone: true,
  imports: [MenuModule,ButtonModule],
  templateUrl: './modale-impostazioni-qualifica.component.html',
  styleUrl: './modale-impostazioni-qualifica.component.css'
})
export class ModaleImpostazioniQualificaComponent implements OnInit {
    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: '1° Livello',
                items: [
                    { label: 'Lavoratori generici' },
                    { label: 'Operai comuni' }
                ]
            },
            {
                label: '2° Livello',
                items: [
                    { label: 'Operai qualificati' },
                    { label: 'Addetti alle macchine utensili semplici' }
                ]
            },
            {
                label: '3° Livello',
                items: [
                    { label: 'Operai specializzati' },
                    { label: 'Addetti a macchine utensili complesse' }
                ]
            },
            {
                label: '4° Livello',
                items: [
                    { label: 'Operai specializzati di alta qualificazione' },
                    { label: 'Manutentori' },
                    { label: 'Addetti a linee di produzione automatizzate' }
                ]
            },
            {
                label: '5° Livello',
                items: [
                    { label: 'Tecnici operativi' },
                    { label: 'Capi squadra' },
                    { label: 'Addetti alla programmazione di macchine CNC (controllo numerico computerizzato)' }
                ]
            },
            {
                label: '6° Livello',
                items: [
                    { label: 'Tecnici esperti' },
                    { label: 'Capi reparto' },
                    { label: 'Programmatori CNC avanzati' }
                ]
            },
            {
                label: '7° Livello',
                items: [
                    { label: 'Quadri tecnici' },
                    { label: 'Responsabili di area' },
                    { label: 'Supervisori di produzione' }
                ]
            },
            {
                label: '8° Livello',
                items: [
                    { label: 'Dirigenti tecnici' },
                    { label: 'Responsabili di settore' },
                    { label: 'Ingegneri di processo' }
                ]
            },
            {
                label: '9° Livello',
                items: [
                    { label: 'Dirigenti di alto livello' },
                    { label: 'Direttori tecnici' },
                    { label: 'Project manager senior' }
                ]
            }
        ];
    }
}


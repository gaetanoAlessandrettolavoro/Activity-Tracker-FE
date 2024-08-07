import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-modale-impostazioni-qualifica',
  standalone: true,
  imports: [MenuModule, ButtonModule],
  templateUrl: './modale-impostazioni-qualifica.component.html',
  styleUrl: './modale-impostazioni-qualifica.component.css'
})
export class ModaleImpostazioniQualificaComponent implements OnInit {
    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Lavoratori generici e Operai comuni',
                items: [
                    { label: 'Lavoratori generici' },
                    { label: 'Operai comuni' }
                ]
            },
            {
                label: 'Operai qualificati e Addetti alle macchine utensili semplici',
                items: [
                    { label: 'Operai qualificati' },
                    { label: 'Addetti alle macchine utensili semplici' }
                ]
            },
            {
                label: 'Operai specializzati e Addetti a macchine utensili complesse',
                items: [
                    { label: 'Operai specializzati' },
                    { label: 'Addetti a macchine utensili complesse' }
                ]
            },
            {
                label: 'Operai specializzati di alta qualificazione, Manutentori e Addetti a linee di produzione automatizzate',
                items: [
                    { label: 'Operai specializzati di alta qualificazione' },
                    { label: 'Manutentori' },
                    { label: 'Addetti a linee di produzione automatizzate' }
                ]
            },
            {
                label: 'Tecnici operativi, Capi squadra e Addetti alla programmazione di macchine CNC',
                items: [
                    { label: 'Tecnici operativi' },
                    { label: 'Capi squadra' },
                    { label: 'Addetti alla programmazione di macchine CNC (controllo numerico computerizzato)' }
                ]
            },
            {
                label: 'Tecnici esperti, Capi reparto e Programmatori CNC avanzati',
                items: [
                    { label: 'Tecnici esperti' },
                    { label: 'Capi reparto' },
                    { label: 'Programmatori CNC avanzati' }
                ]
            },
            {
                label: 'Quadri tecnici, Responsabili di area e Supervisori di produzione',
                items: [
                    { label: 'Quadri tecnici' },
                    { label: 'Responsabili di area' },
                    { label: 'Supervisori di produzione' }
                ]
            },
            {
                label: 'Dirigenti tecnici, Responsabili di settore e Ingegneri di processo',
                items: [
                    { label: 'Dirigenti tecnici' },
                    { label: 'Responsabili di settore' },
                    { label: 'Ingegneri di processo' }
                ]
            },
            {
                label: 'Dirigenti di alto livello, Direttori tecnici e Project manager senior',
                items: [
                    { label: 'Dirigenti di alto livello' },
                    { label: 'Direttori tecnici' },
                    { label: 'Project manager senior' }
                ]
            }
        ];
    }
}

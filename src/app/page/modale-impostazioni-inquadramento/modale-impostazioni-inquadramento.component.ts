import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-modale-impostazioni-inquadramento',
  standalone: true,
  imports: [MenuModule,ButtonModule],
  templateUrl: './modale-impostazioni-inquadramento.component.html',
  styleUrl: './modale-impostazioni-inquadramento.component.css'
})
export class ModaleImpostazioniInquadramentoComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
      this.items = [
          { label: '1° Livello' },
          { label: '2° Livello' },
          { label: '3° Livello' },
          { label: '4° Livello' },
          { label: '5° Livello' },
          { label: '6° Livello' },
          { label: '7° Livello' },
          { label: '8° Livello' },
          { label: '9° Livello' }
      ];
  }
}
import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-dropdown-inquadramento',
  standalone: true,
  imports: [FormsModule,DropdownModule],
  templateUrl: './dropdown-inquadramento.component.html',
  styleUrl: './dropdown-inquadramento.component.css'
})
export class DropdownInquadramentoComponent {

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
 
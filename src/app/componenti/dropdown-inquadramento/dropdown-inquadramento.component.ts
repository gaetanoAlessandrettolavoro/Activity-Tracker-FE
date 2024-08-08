import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-dropdown-inquadramento',
  standalone: true,
  imports: [FormsModule, DropdownModule],
  templateUrl: './dropdown-inquadramento.component.html',
  styleUrls: ['./dropdown-inquadramento.component.css']
})
export class DropdownInquadramentoComponent implements OnInit {

  items: MenuItem[] | undefined;

  @Output() selected = new EventEmitter<any>();

  ngOnInit() {
    this.items = [
      { label: '1° Livello', value: '1° Livello' },
      { label: '2° Livello', value: '2° Livello' },
      { label: '3° Livello', value: '3° Livello' },
      { label: '4° Livello', value: '4° Livello' },
      { label: '5° Livello', value: '5° Livello' },
      { label: '6° Livello', value: '6° Livello' },
      { label: '7° Livello', value: '7° Livello' },
      { label: '8° Livello', value: '8° Livello' },
      { label: '9° Livello', value: '9° Livello' }
    ];
  }

  onChange(event: any) {
    this.selected.emit(event.value);
  }
}

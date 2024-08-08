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

  items: string[] | undefined;

  @Output() selected = new EventEmitter<any>();

  ngOnInit() {
    this.items = [
       '1° Livello',
     '2° Livello',
      '3° Livello', 
      '4° Livello', 
      '5° Livello',
       '6° Livello',
      '7° Livello', 
     '8° Livello', 
    '9° Livello',
    ];
  }

  onChange(event: any) {
    this.selected.emit(event.value);
  }
}

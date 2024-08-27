import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-dropdown-inquadramento',
  standalone: true,
  imports: [FormsModule, DropdownModule],
  templateUrl: './dropdown-inquadramento.component.html',
  styleUrls: ['./dropdown-inquadramento.component.css']
})
export class DropdownInquadramentoComponent implements OnInit {
  items: string[] = [];
  @Output() selected = new EventEmitter<string>();

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
      '9° Livello'
    ];
  }

  onChange(event: any) {
    this.selected.emit(event.value);
  }
}
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dropdown-qualifica',
  standalone: true,
  imports: [DropdownModule, FormsModule],
  templateUrl: './dropdown-qualifica.component.html',
  styleUrls: ['./dropdown-qualifica.component.css']
})
export class DropdownQualificaComponent implements OnChanges {
  @Input() inputItems: string[] = [];
  @Output() selected = new EventEmitter<string>();
  items: string[] = [];

  ngOnChanges() {
    this.items = this.inputItems;
    console.log (this.inputItems);
  }

  onchange(evento: any) {
    this.selected.emit(evento.value);
  }
}
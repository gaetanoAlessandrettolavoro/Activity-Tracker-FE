import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dropdown-qualifica',
  standalone: true,
  imports: [DropdownModule, FormsModule],
  templateUrl: './dropdown-qualifica.component.html',
  styleUrls: ['./dropdown-qualifica.component.css']
})
export class DropdownQualificaComponent implements OnInit {
  @Input() items: string[] = [];
  @Output() selected = new EventEmitter<string>();

  ngOnInit() {}

  onChange(event: any) {
    this.selected.emit(event.value);
  }
}
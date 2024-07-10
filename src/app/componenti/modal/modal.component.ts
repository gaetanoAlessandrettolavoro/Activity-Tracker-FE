import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [DialogModule,ButtonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  visible: boolean = false;

  @Input() message! : any

  showDialog() {
      this.visible = true;
  }
}

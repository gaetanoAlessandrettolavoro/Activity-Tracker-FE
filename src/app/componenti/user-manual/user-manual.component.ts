import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-user-manual',
  standalone: true,
  providers: [PrimeIcons],
  imports: [DialogModule, ButtonModule],
  templateUrl: './user-manual.component.html',
  styleUrls: ['./user-manual.component.css']
})
export class UserManualComponent {
  manualVisible: boolean = false;

  showDialog() {
    this.manualVisible = true;
  }
}

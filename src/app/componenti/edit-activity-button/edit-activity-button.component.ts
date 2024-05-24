import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { EditActivityFormComponent } from '../edit-activity-form/edit-activity-form.component';

@Component({
  selector: 'edit-activity',
  standalone: true,
  imports: [DialogModule, ButtonModule, EditActivityFormComponent],
  templateUrl: './edit-activity-button.component.html',
  styleUrl: './edit-activity-button.component.css',
})
export class EditActivityButtonComponent implements OnInit{
  visible: boolean = false;

  @Input({required: true}) activity!: any; //DA TIPIZZARE

  showDialog() {
    this.visible = true;
  }

  activityToPass!: any;

  ngOnInit() {
    this.activityToPass = this.activity;
  }
}

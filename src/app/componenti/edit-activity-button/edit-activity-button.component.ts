import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { EditActivityFormComponent } from '../edit-activity-form/edit-activity-form.component';
import { Activity } from '../../model/activityModel';

@Component({
  selector: 'edit-activity',
  standalone: true,
  imports: [DialogModule, ButtonModule, EditActivityFormComponent],
  templateUrl: './edit-activity-button.component.html',
  styleUrl: './edit-activity-button.component.css',
})
export class EditActivityButtonComponent implements OnInit{
  visible: boolean = false;

  @Input({required: true}) activity!: Activity;

  showDialog() {
    this.visible = true;
  }

  activityToPass!: any;

  ngOnInit() {
    this.activityToPass = this.activity;
  }
}

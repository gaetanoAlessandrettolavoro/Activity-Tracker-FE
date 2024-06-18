import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { EditActivityFormComponent } from '../edit-activity-form/edit-activity-form.component';
import { Activity } from '../../models/activityModel';

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

  @Output() activityEdited = new EventEmitter<boolean>(false);

  showDialog() {
    this.visible = true;
  }

  activityToPass!: any;

  ngOnInit() {
    this.activityToPass = this.activity;
  }

  edited(){
    this.activityEdited.emit(true);
    this.visible = false;
  }
}

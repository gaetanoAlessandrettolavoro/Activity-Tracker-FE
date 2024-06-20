import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RippleModule } from 'primeng/ripple';
import { Activity } from '../../models/activityModel';
import { ServiceTasksService } from '../../servizi/service-tasks.service';
import { Task } from '../../models/taskModel';
import { TaskResponse } from '../../models/taskResponseModel';
import { ActivitiesServicesService } from '../../servizi/activities-services.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'edit-activity-form',
  standalone: true,
  imports: [FormsModule, CalendarModule, ReactiveFormsModule, InputTextareaModule, FloatLabelModule, DropdownModule, ButtonModule, RippleModule],
  templateUrl: './edit-activity-form.component.html',
  styleUrl: './edit-activity-form.component.css'
})
export class EditActivityFormComponent implements OnInit{
  @Input({required: true}) activity!: Activity;

  @Output() activityEdited = new EventEmitter<boolean>(false);

  constructor(private servicetasks: ServiceTasksService, private activitiesservice:ActivitiesServicesService) {}

  activityToEdit = signal<any>({});
  tasks = signal<Task[]>([]);
  prevTask = signal<Task>({} as Task);

  maxDate = new Date();
  minDate = new Date(this.maxDate.getFullYear(), this.maxDate.getMonth());

  ngOnInit() {
    const newActivity: Activity = {...this.activity};
    this.servicetasks.getAllTasks().subscribe((result: TaskResponse) => {
      this.tasks.set(result.data.document);
    });
    this.activityToEdit.set(newActivity);
    this.prevTask.set({taskName: this.activity.taskName, _id: this.activity.taskID });
    this.servicetasks.getAllTasks()
  }

  activityForm = new FormGroup({
    orarioInizio: new FormControl(this.activityToEdit().startTime, [Validators.required]),
    orarioFine: new FormControl(this.activityToEdit().endTime, [Validators.required]),
    taskName: new FormControl(this.activityToEdit().taskName, [Validators.required]),
    note: new FormControl(this.activityToEdit().notes, [Validators.required]),
  })

  onSubmitForm() {
    const [year, month, day, hours, minutes] = [
      this.activityForm.value.orarioInizio.getFullYear(),
      this.activityForm.value.orarioInizio.getMonth(),
      this.activityForm.value.orarioInizio.getDate(),
      this.activityForm.value.orarioFine.getHours(),
      this.activityForm.value.orarioFine.getMinutes()
    ]
    const updatedActivity: Activity = {...this.activityToEdit(), startTime: this.activityForm.value.orarioInizio, endTime: new Date(year, month, day, hours, minutes), taskName: this.activityForm.value.taskName.taskName, notes: this.activityForm.value.note, taskID: this.activityForm.value.taskName._id};
    this.activitiesservice.updateActivities(updatedActivity, updatedActivity._id).subscribe((result) => {
      this.activityEdited.emit(true);
    });
  }
}

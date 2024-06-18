import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RippleModule } from 'primeng/ripple';
import { Activity } from '../../models/activityModel';
import { TasksService } from '../../servizi/tasks.service';
import { Task } from '../../models/taskModel';
import { TaskResponse } from '../../models/taskResponseModel';
import { ModificAttivitàAdminVisUtenteSpecificoService } from '../../servizi/modific-attività-admin-vis-utente-specifico.service';

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

  constructor(private taskService: TasksService, private modifyActivity: ModificAttivitàAdminVisUtenteSpecificoService) {}

  activityToEdit = signal<any>({});
  tasks = signal<Task[]>([]);
  tasksToPrint = signal<string[]>([]);
  selectedTask = signal<string>("");

  ngOnInit() {
    const newActivity: Activity = {...this.activity};
    this.taskService.getAllTasks().subscribe((result: TaskResponse) => {
      this.tasks.set(result.data.document);
      this.tasksToPrint.set(this.tasks().map((task) => task.taskName));
    });
    this.activityToEdit.set(newActivity);
    this.selectedTask.set(this.activity.taskName);
    this.taskService.getAllTasks()
  }

  activityForm = new FormGroup({
    data: new FormControl(this.activityToEdit().activityDate, [Validators.required]),
    orarioInizio: new FormControl(this.activityToEdit().startTime, [Validators.required]),
    orarioFine: new FormControl(this.activityToEdit().endTime, [Validators.required]),
    taskName: new FormControl(this.activityToEdit().taskName, [Validators.required]),
    note: new FormControl(this.activityToEdit().notes, [Validators.required]),
  })

  onSubmitForm() {
    const updatedActivity: Activity = {...this.activityToEdit(), activityDate: this.activityForm.value.data, startTime: this.activityForm.value.orarioInizio, endTime: this.activityForm.value.orarioFine, taskName: this.activityForm.value.taskName, notes: this.activityForm.value.note};
    this.modifyActivity.updateUserActivities(updatedActivity, updatedActivity._id).subscribe((result) => {
      this.activityEdited.emit(true);
    });
  }
}

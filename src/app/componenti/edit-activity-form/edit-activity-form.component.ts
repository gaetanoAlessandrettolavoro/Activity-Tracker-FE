import { Component, Input, OnInit, signal } from '@angular/core';
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

interface TaskResponse {
  data: {
  document: Task[];
  };
  }
@Component({
  selector: 'edit-activity-form',
  standalone: true,
  imports: [FormsModule, CalendarModule, ReactiveFormsModule, InputTextareaModule, FloatLabelModule, DropdownModule, ButtonModule, RippleModule],
  templateUrl: './edit-activity-form.component.html',
  styleUrl: './edit-activity-form.component.css'
})
export class EditActivityFormComponent implements OnInit{
  @Input({required: true}) activity!: Activity;

  constructor(private taskService: TasksService) {}

  activityToEdit = signal<any>({});
  tasks = signal<Task[]>([]);
  tasksToPrint = signal<string[]>([]);
  selectedTask = signal<string>("");

  ngOnInit() {
    const newActivity = {
      taskName: this.activity.taskName,
      activityDate: this.activity.activityDate,
      startTime: this.activity.startTime,
      endTime: this.activity.endTime,
      notes: this.activity.notes,
    }
    this.taskService.getAllTasks().subscribe((result: TaskResponse) => {
      this.tasks.set(result.data.document);
      this.tasksToPrint.set(this.tasks().map((task) => task.taskName));
    });
    this.activityToEdit.set(newActivity);
    this.selectedTask.set(this.activity.taskName);
    this.taskService.getAllTasks()
  }

  activityForm = new FormGroup({
    data: new FormControl(this.activityToEdit().data, [Validators.required]),
    orarioInizio: new FormControl(this.activityToEdit().orarioInizio, [Validators.required]),
    orarioFine: new FormControl(this.activityToEdit().orarioFine, [Validators.required]),
    taskName: new FormControl(this.activityToEdit().taskName, [Validators.required]),
    note: new FormControl(this.activityToEdit().note, [Validators.required]),
  })

  onSubmitForm() {
    console.log(this.activityForm.value);
    // PRIMA DI FARE IL POST, BISOGNA CONVERTIRE I VALORI DEL FORM IN UN OGGETTO ACTIVITY
  }
}

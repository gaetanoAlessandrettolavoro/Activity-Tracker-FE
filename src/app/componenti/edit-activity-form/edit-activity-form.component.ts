import { Component, Input, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RippleModule } from 'primeng/ripple';

interface DailyActivity {
  activityType: string;
  data: string;
  orarioInizio: string;
  orarioFine: string;
  note: string;
}

@Component({
  selector: 'edit-activity-form',
  standalone: true,
  imports: [FormsModule, CalendarModule, ReactiveFormsModule, InputTextareaModule, FloatLabelModule, DropdownModule, ButtonModule, RippleModule],
  templateUrl: './edit-activity-form.component.html',
  styleUrl: './edit-activity-form.component.css'
})
export class EditActivityFormComponent implements OnInit{
  @Input({required: true}) activity!: DailyActivity;

  activityToEdit = signal<any>({});
  activityTypes = signal<string[]>([""]);
  selectedActivityType = signal<string>("");

  ngOnInit() {
    const dateArray = this.activity.data.split('-');
    const orarioInizioArray = this.activity.orarioInizio.split(':');
    const orarioFineArray = this.activity.orarioFine.split(':');
    const newActivity = {
      activityType: this.activity.activityType,
      data: new Date(parseInt(dateArray[2]), (parseInt(dateArray[1])-1), parseInt(dateArray[0])),
      orarioInizio: new Date(0, 0, 0, parseInt(orarioInizioArray[0]), parseInt(orarioInizioArray[1])), //al submit si farà il getTime
      orarioFine: new Date(0, 0, 0, parseInt(orarioFineArray[0]), parseInt(orarioFineArray[1])), //al submit si farà il getTime
      note: this.activity.note,
    }
    const newActivityTypes = ["Running", "Swimming", "Cycling", "Walking", "Gym", "Yoga", "Pilates", "Dance", "Meditation", "Other"];
    this.activityToEdit.set(newActivity);
    this.activityTypes.set(newActivityTypes);
    this.selectedActivityType.set(this.activity.activityType);
  }

  activityForm = new FormGroup({
    data: new FormControl(this.activityToEdit().data, [Validators.required]),
    orarioInizio: new FormControl(this.activityToEdit().orarioInizio, [Validators.required]),
    orarioFine: new FormControl(this.activityToEdit().orarioFine, [Validators.required]),
    activityType: new FormControl(this.activityToEdit().activityType, [Validators.required]),
    note: new FormControl(this.activityToEdit().note, [Validators.required]),
  })

  onSubmitForm() {
    console.log(this.activityForm.value);
  }
}

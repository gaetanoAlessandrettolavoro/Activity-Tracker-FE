import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
import { DatePipe, NgIf } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { UserServiceService } from '../../servizi/user-service.service';
import { ToastModule } from 'primeng/toast';
import { ErrorServiziService } from '../../servizi/error-servizi.service';

@Component({
  selector: 'edit-activity-form',
  standalone: true,
  imports: [
    FormsModule,
    CalendarModule,
    ReactiveFormsModule,
    InputTextareaModule,
    FloatLabelModule,
    DropdownModule,
    ButtonModule,
    RippleModule,
    ToastModule,
  ],
  templateUrl: './edit-activity-form.component.html',
  styleUrl: './edit-activity-form.component.css',
  providers: [MessageService],
})
export class EditActivityFormComponent implements OnInit {
  today = new Date().toISOString().split('T')[0];
  @Input({ required: true }) activity!: Activity;

  @Output() activityEdited = new EventEmitter<boolean>(false);

  constructor(
    private servicetasks: ServiceTasksService,
    private activitiesservice: ActivitiesServicesService,
    private messageService: MessageService,
    private router: Router,
    private userService: UserServiceService,
    private errors: ErrorServiziService
  ) {}

  activityToEdit = signal<any>({});
  tasks = signal<Task[]>([]);
  prevTask = signal<Task>({} as Task);

  maxDate = new Date();
  minDate = new Date(this.maxDate.getFullYear(), this.maxDate.getMonth());

  showError(statusCode: number) {
    if(statusCode === 401 || statusCode === 429) {
      this.messageService.add(this.errors.getErrorMessage(statusCode));
      setTimeout(() => {
        this.userService.logout();
        this.router.navigate(['/login']);
      }, 3000);
    } else {
      this.messageService.add(this.errors.getErrorMessage(statusCode));
    }
  }

  ngOnInit() {
    const newActivity: Activity = { ...this.activity };
    this.servicetasks.getAllTasks().subscribe({
      next: (result: TaskResponse) => {
        this.tasks.set(result.data.document);
      },
      error: (error) => {
        this.showError(error.status);
      },
    });
    this.activityToEdit.set(newActivity);
    this.prevTask.set({
      taskName: this.activity.taskName,
      _id: this.activity.taskID,
    });
    this.servicetasks.getAllTasks();
  }
  activityForm = new FormGroup({
    orarioInizio: new FormControl(this.activityToEdit().startTime, [
      Validators.required,
    ]),
    orarioFine: new FormControl(this.activityToEdit().endTime, [
      Validators.required,
    ]),
    taskName: new FormControl(this.activityToEdit().taskName, [
      Validators.required,
    ]),
    note: new FormControl(this.activityToEdit().notes, [Validators.required]),
  });

  onSubmitForm() {
    const [year, month, day, hours, minutes] = [
      this.activityForm.value.orarioInizio.getFullYear(),
      this.activityForm.value.orarioInizio.getMonth(),
      this.activityForm.value.orarioInizio.getDate(),
      this.activityForm.value.orarioFine.getHours(),
      this.activityForm.value.orarioFine.getMinutes(),
    ];
    const updatedActivity: Activity = {
      ...this.activityToEdit(),
      startTime: this.activityForm.value.orarioInizio,
      endTime: new Date(year, month, day, hours, minutes),
      taskName: this.activityForm.value.taskName.taskName,
      notes: this.activityForm.value.note,
      taskID: this.activityForm.value.taskName._id,
    };
    this.activitiesservice
      .updateActivities(updatedActivity, updatedActivity._id)
      .subscribe({
        next: (result) => {
          this.activityEdited.emit(true);
        },
        error: (err) => {
          this.showError(err.status);
        },
      });
  }
}

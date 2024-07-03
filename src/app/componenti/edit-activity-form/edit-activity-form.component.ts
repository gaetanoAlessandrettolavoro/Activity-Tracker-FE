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
  dateToEdit = signal<string>('');
  startToEdit = signal<string>('');
  endToEdit = signal<string>('');

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
        this.tasks().find((el) => {
          if(el.taskName === this.activity.taskName) {
            this.prevTask.set(el);
          }
        })
      },
      error: (error) => {
        this.showError(error.status);
      },
    });
    this.activityToEdit.set(newActivity);
    this.dateToEdit.set(newActivity.startTime.toISOString().split('T')[0]);
    this.startToEdit.set(newActivity.startTime.toLocaleString().split(', ')[1]);
    this.endToEdit.set(newActivity.endTime.toLocaleString().split(', ')[1]);
  }

  activityForm = new FormGroup({
    date: new FormControl(this.dateToEdit(), Validators.required),
    orarioInizio: new FormControl(this.startToEdit(), [
      Validators.required,
    ]),
    orarioFine: new FormControl(this.endToEdit(), [
      Validators.required,
    ]),
    taskName: new FormControl(this.activityToEdit().taskName, [
      Validators.required,
    ]),
    note: new FormControl(this.activityToEdit().notes, [Validators.required]),
  });

  onSubmitForm() {
    if(this.activityForm.value.date && this.activityForm.value.orarioInizio && this.activityForm.value.orarioFine) {
      const [year, month, day] = [
        parseInt(this.activityForm.value.date?.split('-')[0]),
        parseInt(this.activityForm.value.date?.split('-')[1]),
        parseInt(this.activityForm.value.date?.split('-')[2])
      ];
      const [startH, startM] = [
        parseInt(this.activityForm.value.orarioInizio.split(':')[0]),
        parseInt(this.activityForm.value.orarioInizio.split(':')[1])
      ]
      const [endH, endM] = [
        parseInt(this.activityForm.value.orarioFine.split(':')[0]),
        parseInt(this.activityForm.value.orarioFine.split(':')[1])
      ]
      const updatedActivity: Activity = {
        ...this.activityToEdit(),
        startTime: new Date(year, month, day, startH, startM),
        endTime: new Date(year, month, day, endH, endM),
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
}

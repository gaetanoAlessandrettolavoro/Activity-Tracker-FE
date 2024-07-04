import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ActivitiesServicesService } from '../../servizi/activities-services.service';
import { Activity } from '../../models/activityModel';
import { Task } from '../../models/taskModel';
import { ServiceTasksService } from '../../servizi/service-tasks.service';
import { TaskResponse } from '../../models/taskResponseModel';
import { MessageService } from 'primeng/api';
import { UserServiceService } from '../../servizi/user-service.service';
import { ErrorServiziService } from '../../servizi/error-servizi.service';


@Component({
  selector: 'app-user-task-creation',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    RouterOutlet,
    ReactiveFormsModule,
    MessagesModule,
    CommonModule,
    PasswordModule,
    FormsModule,
    CheckboxModule,
    FileUploadModule,
    ToastModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    CalendarModule,
    FloatLabelModule,
    NgIf
  ],
  templateUrl: './user-task-creation.component.html',
  styleUrls: ['./user-task-creation.component.css'],
  providers: [MessageService],
})
export class UserTaskCreationComponent implements OnInit {
  tasks: Task[] = [];
  selectedCity: Task | undefined;
  userForm!: FormGroup;
  visible: boolean = false;
  activityDate: Date = new Date();
  maxDate: string = new Date().toISOString().split('T')[0];
  minDate: string = new Date(this.activityDate.getFullYear(), this.activityDate.getMonth(), 2).toISOString().split('T')[0];

  @Input() userID!: string;

  @Input() hidden: boolean = false;

  @Output() buttonClicked: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private servicetasks: ServiceTasksService,
    private route: ActivatedRoute,
    private activitiesservices:ActivitiesServicesService,
    private router: Router,
    private messageService: MessageService,
    private userService: UserServiceService,
    private errors: ErrorServiziService
  ) {}

  showError(statusCode: number) {
    if(statusCode === 401 || statusCode === 429) {
      this.messageService.add(this.errors.getErrorMessage(statusCode));
      setTimeout(() => {
        this.userService.logout();
        this.router.navigate(['/login']);
      }, 3000);
    } else if(statusCode === 403) {
      this.messageService.add({...this.errors.getErrorMessage(statusCode), detail: "Puoi creare attività solo nel mese in corso. La nuova attività non può essere contemporanea alle precedenti"});
    } else {
      this.messageService.add(this.errors.getErrorMessage(statusCode));
    }
  }

  showDialog() {
    this.visible = true;
  }

  ngOnInit() {
    console.log(this.minDate, this.maxDate)
    this.servicetasks.getAllTasks().subscribe({next:(result: TaskResponse) => {this.tasks = result.data.document}, error: (error) => {this.showError(error.status)}});

    this.userForm = new FormGroup({
      notes: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      date: new FormControl(this.activityDate.toISOString().split('T')[0]),
      startTime: new FormControl('', Validators.required),
      endTime: new FormControl('', Validators.required),
      selectedTask: new FormControl('', Validators.required),
    });
  }

  noVisible() {
    this.visible = false;
  }

  onSubmit() {
    this.buttonClicked.emit("valore da spedire");
    if (this.userForm.valid) {
      console.log(this.userForm.value.date)
      let [year, month, day] = [this.userForm.value.date.split('-')[0],this.userForm.value.date.split('-')[1],this.userForm.value.date.split('-')[2]];
      let start = this.userForm.get('startTime')?.value.split(':');
      let startH = parseInt(start[0]);
      let startM = parseInt(start[1]);
      let end = this.userForm.get('endTime')?.value.split(':');
      let endH = parseInt(end[0]);
      let endM = parseInt(end[1]);
      const selectedTask = this.userForm.get('selectedTask')?.value;
      const activityToSend: Activity = {
        startTime: new Date(year, month-1, day, startH, startM),
        endTime: new Date(year, month-1, day, endH, endM),
        taskName: selectedTask.taskName,
        taskID: selectedTask._id,
        notes: this.userForm.get('notes')?.value,
      };
      this.getToken(activityToSend);
    } else {
      this.showError(1);
    }
  }

  getToken(data: any) {
    console.log(data);
    this.route.params.subscribe((params) => {
      this.activitiesservices.createActivity(data, this.userID).subscribe({
        next: (result: any) => {
          if(result.status == "success"){
            this.buttonClicked.emit("Valore");
          }
          this.noVisible();
        },
        error: (error: any) => {
          this.showError(error.status);
        },
      });
    });
  }

  
}

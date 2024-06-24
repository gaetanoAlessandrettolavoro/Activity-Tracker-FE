
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageService } from 'primeng/api';
import { UserServiceService } from '../../servizi/user-service.service';

interface City {
  taskName: string;
  taskId: any;
}

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
    FloatLabelModule
  ],
  templateUrl: './user-task-creation.component.html',
  styleUrls: ['./user-task-creation.component.css'],
  providers: [MessageService],
})
export class UserTaskCreationComponent implements OnInit {
  currentDateTime: Date;
  tasks: Task[] = [];
  selectedCity: Task | undefined;
  userForm!: FormGroup;
  visible: boolean = false;

  @Output() buttonClicked: EventEmitter<string> = new EventEmitter<string>();

  show(statusCode: number) {
    if (statusCode === 401) {
      this.messageService.add({
        severity: 'error',
        summary: 'Errore 401',
        detail: 'Sembra che tu non sia autenticato. Accedi per continuare.',
      });
      setTimeout(() => {
        this.userService.logout();
        this.router.navigate(['/login']);
      }, 3000);
    }
    if (statusCode === 500) {
      this.messageService.add({
        severity: 'error',
        summary: 'Errore 500',
        detail: 'Errore interno del server, riprova più tardi.',
      });
    }
  }

  showDialog() {
    this.visible = true;
  }

  constructor(
    private servicetasks: ServiceTasksService,
    private route: ActivatedRoute,
    private activitiesservices:ActivitiesServicesService,
    private router: Router,
    private messageService: MessageService,
    private userService: UserServiceService
  ) {
    this.currentDateTime = new Date();
    setInterval(() => {
      this.currentDateTime = new Date();
    }, 1000); // Update the date and time every second
  }

  ngOnInit() {
    this.servicetasks.getAllTasks().subscribe({next:(result: TaskResponse) => {this.tasks = result.data.document}, error: (error) => {this.show(error.status)}});

    this.userForm = new FormGroup({
      notes: new FormControl('', [Validators.required, Validators.maxLength(100)]),
     
      startTime: new FormControl('', Validators.required),
      endTime: new FormControl('', Validators.required),
      selectedTask: new FormControl('', Validators.required),
    });
  }

  noVisible() {
    this.visible = false;
  }

  onSubmit() {
    this.buttonClicked.emit("valore da spedire")
    if (this.userForm.valid) {
      let date = new Date();
      let [year, month, day] = [date.getFullYear(), date.getMonth(), date.getDate() ]
      let start = this.userForm.get('startTime')?.value.split(':');
      let startH = parseInt(start[0]);
      let startM = parseInt(start[1]);
      let end = this.userForm.get('endTime')?.value.split(':');
      let endH = parseInt(end[0]);
      let endM = parseInt(end[1]);
      const selectedTask = this.userForm.get('selectedTask')?.value;
      const activityToSend: Activity = {
        startTime: new Date(year, month, day, startH, startM),
        endTime: new Date(year, month, day, endH, endM),
        taskName: selectedTask.taskName,
        taskID: selectedTask._id,
        notes: this.userForm.get('notes')?.value,
      };
      this.getToken(activityToSend);
    } else {
      console.log('Form not valid');
    }
  }

  getToken(data: any) {
    console.log(data);
    this.route.params.subscribe((params) => {
      this.activitiesservices.createActivity(data).subscribe({
        next: (result: any) => {7
          if(result.status == "success"){
            this.buttonClicked.emit("Valore");
          }
        },
        error: (error: any) => {
          this.show(error.status);
        },
      });
    });
  }

  
}

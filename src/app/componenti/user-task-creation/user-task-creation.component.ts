import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
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
import { AdminAddActivityForUserService } from '../../servizi/admin-add-activity-for-user.service';
import { Activity } from '../../models/activityModel';
import { Task } from '../../models/taskModel';
import { TasksService } from '../../servizi/tasks.service';
import { TaskResponse } from '../../models/taskResponseModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    FloatLabelModule,
  ],
  templateUrl: './user-task-creation.component.html',
  styleUrls: ['./user-task-creation.component.css']
})
export class UserTaskCreationComponent implements OnInit {
  currentDateTime: Date;
  tasks: Task[] = [];
  selectedCity: Task | undefined;
  userForm!: FormGroup;
  visible: boolean = true;

  constructor(
    private addService: AdminAddActivityForUserService,
    private tasksServ: TasksService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.currentDateTime = new Date();
    setInterval(() => {
      this.currentDateTime = new Date();
    }, 1000); // Update the date and time every second
  }

  ngOnInit() {
    this.tasksServ.getAllTasks().subscribe((result: TaskResponse) => (this.tasks = result.data.document));

    this.userForm = new FormGroup({
      notes: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      activityDate: new FormControl('', Validators.required),
      startTime: new FormControl('', Validators.required),
      endTime: new FormControl('', Validators.required),
      selectedTask: new FormControl('', Validators.required),
    });
  }

  noVisible() {
    this.visible = false;
  }

  onSubmit() {
    if (this.userForm.valid) {
      let date = this.userForm.get('activityDate')?.value.split('-');
      let year = parseInt(date[0]);
      let month = parseInt(date[1]) - 1;
      let day = parseInt(date[2]);
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
      this.newPassword(data).subscribe({
        next: (result: any) => {
          console.log('ciao');
        },
        error: (error: any) => {
          console.error('Si è verificato un errore:', error);
        },
      });
    });
  }

  newPassword(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/v1/activities', data, { withCredentials: true });
  }
}

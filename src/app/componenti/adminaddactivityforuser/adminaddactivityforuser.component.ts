import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators, } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
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

@Component({
  selector: 'addactivityforuser',
  standalone: true,
  imports: [ButtonModule, DialogModule, RouterOutlet, ReactiveFormsModule, MessagesModule, CommonModule, PasswordModule, FormsModule, CheckboxModule, FileUploadModule, ToastModule, InputTextModule, InputTextareaModule, DropdownModule, CalendarModule, FloatLabelModule,],
  templateUrl: './adminaddactivityforuser.component.html',
  styleUrl: './adminaddactivityforuser.component.css'
})
export class AdminaddactivityforuserComponent {

  @Input({required: true}) userID!: string;

  constructor(private addService: AdminAddActivityForUserService, private tasksServ: TasksService) { }

  firstName: any;
  lastName: any;
  value: any;

  tasks: Task[] = [];
  selectedCity: Task | undefined;
  userForm!: FormGroup;

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  ngOnInit() {
    this.tasksServ.getAllTasks().subscribe((result: TaskResponse) => this.tasks = result.data.document)

    this.userForm = new FormGroup({
      notes: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      startTime: new FormControl('', Validators.required),
      endTime: new FormControl('', Validators.required),
      taskName: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      let date = new Date().toISOString().split('T')[0].split('-');
      let year = parseInt(date[0]);
      let month = parseInt(date[1])-1;
      let day = parseInt(date[2]);
      let start = this.userForm.get("startTime")?.value.split(":");
      let startH = parseInt(start[0]);
      let startM = parseInt(start[1]);
      let end = this.userForm.get("endTime")?.value.split(":")
      let endH = parseInt(end[0]);
      let endM = parseInt(end[1]);
      let email = this.userForm.get("email")?.value;
      const activityToSend: Activity = {
        startTime: new Date(year, month, day, startH, startM),
        endTime: new Date(year, month, day, endH, endM),
        taskName: this.userForm.get("taskName")?.value.taskName,
        notes: this.userForm.get("notes")?.value,
        taskID: this.userForm.get("taskName")?.value._id
      };
      this.addService.addActivityForUser(activityToSend, this.userID).subscribe((result: any) => console.log(result));
    } else {
      console.log('Form not valid');
    }
  }
}




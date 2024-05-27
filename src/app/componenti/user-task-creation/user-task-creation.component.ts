import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
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

interface City {
  name: string;
  code: string;
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
  styleUrl: './user-task-creation.component.css'
})
export class UserTaskCreationComponent {
  
  cities: City[] | undefined;
  selectedCity: City | undefined;
  userForm!: FormGroup;

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  ngOnInit() {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];

    this.userForm = new FormGroup({
      inputtextarea: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      dataattuale: new FormControl('', Validators.required),
      orariodiinizio: new FormControl('', Validators.required),
      orariodifine: new FormControl('', Validators.required),
      selectedActivity: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form Submitted!', this.userForm.value);
    } else {
      console.log('Form not valid');
    }
  }
}


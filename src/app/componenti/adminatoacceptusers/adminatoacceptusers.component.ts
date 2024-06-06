import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';




@Component({
  selector: 'app-adminatoacceptusers',
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
    TableModule
  ],
  templateUrl: './adminatoacceptusers.component.html',
  styleUrl: './adminatoacceptusers.component.css'
})


export class AdminatoacceptusersComponent {

  citiesc = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
  ];

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  products!: any

    constructor() {}

    ngOnInit() {
        this.products = [{name:'Gaetano',cognome:'Alessandretto'},
        {name:'Francesco',cognome:'Pala'},
        {name:'Mario',cognome:'Rossi'},
        {name:'Giuseppe',cognome:'Pisani'},
          
        ]
    }


    

  
}



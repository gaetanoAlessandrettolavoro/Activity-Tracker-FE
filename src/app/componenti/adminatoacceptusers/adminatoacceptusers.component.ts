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
import { AdminserviceService } from '../../servizi/adminservice.service';




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

  products: any[] = [];
  conteggio! : any
  usersfalse! : any
  buttonlampeggiante : any


    constructor(private admin : AdminserviceService) {}

  fetchData = () => {
  this.admin.isAccetpedFalse().subscribe({
    next: (value) => {
      console.log(value);
      if (value.results === 0) {
        this.usersfalse = false;
        this.buttonlampeggiante = false;
      } else {
        this.usersfalse = false;
        this.buttonlampeggiante = true;
        this.conteggio = `(${value.results})`;
      }
      this.products = value.data.document.map((element: any) => {
        return { name: element.firstName, cognome: element.lastName, codicefiscale: element.codiceFiscale, email: element.email, id: element._id };
      });
    },
    error: (err) => {
      console.error('Error fetching data', err);
    }
  });
};


interval = setInterval(() => {
  this.fetchData(); 
}, 36000); 




  
    

   
    accetta(id:any){
      this.admin.acceptedUser(id).subscribe(result => console.log(result))
      window.location.reload();
    }

    rifiuta(id:any){
      this.admin.rejectUser(id).subscribe(result => console.log(result))
      window.location.reload();
    }

   
    

    }

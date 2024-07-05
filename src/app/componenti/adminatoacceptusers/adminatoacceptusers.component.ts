import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
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
import { MessageService } from 'primeng/api';
import { ErrorServiziService } from '../../servizi/error-servizi.service';
import { UserServiceService } from '../../servizi/user-service.service';




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
  styleUrl: './adminatoacceptusers.component.css',
  providers: [MessageService]
})


export class AdminatoacceptusersComponent implements OnInit {

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  products: any[] = [];
  conteggio = signal<string>('');
  usersfalse! : any
  buttonlampeggiante : any


  constructor(private admin : AdminserviceService, private messageService: MessageService, private errors: ErrorServiziService, private userService: UserServiceService, private router: Router) {}

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

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData = () => {
  this.admin.isAccetpedFalse().subscribe({
    next: (value) => {
      console.log(value);
      if (value.results === 0) {
        this.usersfalse = true;
        this.buttonlampeggiante = false;
      } else {
        this.usersfalse = false;
        this.buttonlampeggiante = true;
        this.conteggio.set(`(${value.results})`);
        console.log('fetchData {else}')
      }
      this.products = value.data.document.map((element: any) => {
        return { name: element.firstName, cognome: element.lastName, codicefiscale: element.codiceFiscale, email: element.email, id: element._id };
      });
    },
    error: (err) => {
      this.showError(err.status);
    }
  });
};


interval = setInterval(() => {
  this.fetchData(); 
}, 36000); 

  accetta(id:any){
    this.admin.acceptedUser(id).subscribe({
      next: (result) => {
        this.conteggio.set('');
        this.fetchData();
      },
      error: (error) => {
        this.showError(error.status)
        this.conteggio.set('');
        this.fetchData();
      }
    })
  }

  rifiuta(id:any){
    this.admin.rejectUser(id).subscribe({
      next: (result) => {
        this.conteggio.set('');
        this.fetchData();
      },
      error: (error) => {
        console.error(error)
        this.showError(error.status)
        this.conteggio.set('');
        this.fetchData();
      }
    })
  }
}

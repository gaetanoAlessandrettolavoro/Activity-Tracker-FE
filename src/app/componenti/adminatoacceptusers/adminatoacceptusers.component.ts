import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { LoggingService } from '../../servizi/logging.service';




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


  constructor(private admin : AdminserviceService, private messageService: MessageService, private errors: ErrorServiziService, private userService: UserServiceService, private router: Router, private logging: LoggingService) {}

  showError(statusCode: number, errorMessage: string, user?: string) {
    if(user) {
      this.logging.error(`Error occurred creating ${user} task.\nError ${statusCode} with message: ${errorMessage}`);
    } else {
      this.logging.error(`Error occurred fetching users to accept.\nError ${statusCode} with message: ${errorMessage}`)
    }
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
      }
      this.products = value.data.document.map((element: any) => {
        return { name: element.firstName, cognome: element.lastName, codicefiscale: element.codiceFiscale, email: element.email, id: element._id };
      });
    },
    error: (err) => {
      this.showError(err.status, err.error.message);
    }
  });
};


interval = setInterval(() => {
  this.fetchData(); 
}, 60 * 1000); 

accetta(user: any) {
  this.admin.acceptedUser(user.id).subscribe({
    next: (result) => {
      this.logging.info(`User ${user.name} ${user.cognome} accepted`);
      // Ricarica la pagina automaticamente dopo aver accettato l'utente
      window.location.reload();
    },
    error: (error) => {
      this.showError(error.status, error.error.message, `${user.name} ${user.cognome}`);
      window.location.reload();
    }
  });
}

rifiuta(user: any) {
  this.admin.rejectUser(user.id).subscribe({
    next: (result) => {
      this.logging.info(`User ${user.name} ${user.cognome} rejected`);
      // Ricarica la pagina automaticamente dopo aver rifiutato l'utente
      window.location.reload();
    },
    error: (error) => {
      this.showError(error.status, error.error.message);
      window.location.reload();
    }
  });
}

}

import { Component, Input } from '@angular/core';
import { ActivitiesServicesService } from '../../servizi/activities-services.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { UserServiceService } from '../../servizi/user-service.service';

@Component({
  selector: 'delete-activity',
  standalone: true,
  imports: [ToastModule],
  templateUrl: './delete-activity-button.component.html',
  styleUrl: './delete-activity-button.component.css',
  providers: [MessageService],
})
export class DeleteActivityButtonComponent {

  @Input({required: true}) activityID!: string;
  
  constructor(private activitiesservice:ActivitiesServicesService, private router: Router, private userService: UserServiceService) {}

  showError(statusCode: number) {
    if(statusCode === 401 || statusCode === 429) {
      if(statusCode === 401) alert("Sembra che tu non sia autenticato. Accedi per continuare.");
      if(statusCode === 429) alert('Troppi tentativi di accesso, riprova tra un\'ora');
      setTimeout(() => {
        this.userService.logout();
        this.router.navigate(['/login']);
      }, 3000);
    } else if(statusCode === 403) {
      alert('Non hai i permessi necessari per accedere a questa risorsa.');
    } else if(statusCode === 404) {
      alert('Risorsa non trovata.');
    } else if(statusCode === 500) {
      alert("Errore interno del server, riprova più tardi.");
    }
  }

  deleteActivity(){
    if(confirm("Sei sicuro di voler eliminare l'attività?")){
      this.activitiesservice.deleteActivity(this.activityID).subscribe({next: (result) => {console.log(result)}, error: (error) => {this.showError(error.status)}});
      window.location.reload();
    }
  }
}
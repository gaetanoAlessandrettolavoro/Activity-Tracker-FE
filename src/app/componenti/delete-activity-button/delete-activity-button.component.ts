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

  show(statusCode: number) {
    if (statusCode === 401) {
      console.log("Errore 401")
      alert("Sembra che tu non sia autenticato. Accedi per continuare.")
      this.userService.logout();
      this.router.navigate(['/login']);
    }
    if (statusCode === 500) {
      alert("Errore interno del server, riprova più tardi.")
    }
  }

  deleteActivity(){
    if(confirm("Sei sicuro di voler eliminare l'attività?")){
      this.activitiesservice.deleteActivity(this.activityID).subscribe(result => (console.log(result)));
      window.location.reload();
    }
  }
}
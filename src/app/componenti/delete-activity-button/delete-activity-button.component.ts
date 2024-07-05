import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivitiesServicesService } from '../../servizi/activities-services.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { UserServiceService } from '../../servizi/user-service.service';
import { ErrorServiziService } from '../../servizi/error-servizi.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'delete-activity',
  standalone: true,
  imports: [ToastModule, NgIf],
  templateUrl: './delete-activity-button.component.html',
  styleUrl: './delete-activity-button.component.css',
  providers: [MessageService],
})
export class DeleteActivityButtonComponent {

  @Input({required: true}) activityID!: string;

  @Input() disabled: boolean = false;

  @Output() deleted = new EventEmitter<boolean>();
  
  constructor(private activitiesservice:ActivitiesServicesService, private router: Router, private userService: UserServiceService, private messageService: MessageService, private errors: ErrorServiziService) {}

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

  deleteActivity(){
    if(confirm("Sei sicuro di voler eliminare l'attività?")){
      this.activitiesservice.deleteActivity(this.activityID).subscribe({
        next: (result) => {
          this.messageService.add({severity: 'success', summary:'Success', detail:'Attività eliminata'});
          this.deleted.emit(true);
        },
        error:(error) => {
          this.showError(error.status)
        }});
    }
  }
}
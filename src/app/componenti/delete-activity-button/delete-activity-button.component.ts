import { Component, Input } from '@angular/core';
import { ActivitiesServicesService } from '../../servizi/activities-services.service';

@Component({
  selector: 'delete-activity',
  standalone: true,
  imports: [],
  templateUrl: './delete-activity-button.component.html',
  styleUrl: './delete-activity-button.component.css'
})
export class DeleteActivityButtonComponent {

  @Input({required: true}) activityID!: string;
  
  constructor(private activitiesservice:ActivitiesServicesService) {}

  deleteActivity(){
    console.log(this.activityID);
    if(confirm("Sei sicuro di voler eliminare l'attività?")){
      this.activitiesservice.deleteActivity(this.activityID).subscribe((result) => console.log(result));
    }
  }
}

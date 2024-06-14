import { Component, Input } from '@angular/core';
import { DeleteActivityService } from '../../servizi/delete-activity.service';

@Component({
  selector: 'delete-activity',
  standalone: true,
  imports: [],
  templateUrl: './delete-activity-button.component.html',
  styleUrl: './delete-activity-button.component.css'
})
export class DeleteActivityButtonComponent {

  @Input({required: true}) activityID!: string;
  
  constructor(private delAct: DeleteActivityService) {}

  deleteActivity(){
    console.log(this.activityID);
    if(confirm("Sei sicuro di voler eliminare l'attività?")){
      this.delAct.deleteActivity(this.activityID).subscribe((result) => console.log(result));
    }
  }
}

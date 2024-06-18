import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ServiceModalAddTypeActivityService } from '../../servizi/service-modal-add-type-activity.service';

@Component({
  selector: 'app-add-type-activity',
  standalone: true,
  imports: [ButtonModule,DialogModule,InputTextModule,FormsModule],
  templateUrl: './add-type-activity.component.html',
  styleUrl: './add-type-activity.component.css'
})
export class AddTypeActivityComponent {
  visible: boolean = false;
   taskname:string = "";
   constructor(private service:ServiceModalAddTypeActivityService){}

  submit(){
this.service.addTypeActivity(this.taskname).subscribe((result:any)=>{
  this.visible=false;
  this.taskname="";
  console.log(result)
})
  }


  showDialog() {
      this.visible = true;
  }
}

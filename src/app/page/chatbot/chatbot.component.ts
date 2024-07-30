import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

interface City {
    name: string;
    code: string;
}


@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [DropdownModule,FormsModule,DialogModule, ButtonModule, InputTextModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent implements OnInit {

  cities: any

  selectedCity: City | undefined;

  risposta! : any

  visible: boolean = true;

   

  ngOnInit() {
      this.cities = [
          { domanda: 'Come posso accettare gli utenti?'},
          { domanda: 'Come visualizzare le attività di un utente specifico?'},
          { domanda : 'Come faccio a vedere le statistiche?'},
          { domanda : "Come faccio ad effettuare il logout?"},
          { domanda : "Come faccio ad andare nelle impostazioni?"},
          { domanda : "Come faccio a fare l'export in excel di tutti i nomi degli utenti?"}
      ];
  }
  
   functionbot(x : any){
        if(x == "Come posso accettare gli utenti?"){
          this.risposta = "Per accettare gli utenti bisogna fare il login,andare nella home e cliccare il bottone <utenti da accettare>" 
        }
        if(x == "Come visualizzare le attività di un utente specifico?"){
          this.risposta = "Per visualizzare le attività di un utente specifico bisogna fare il login,andare nella home e cliccare il bottone <attività> su un utente in particolare"
        }
        if(x == "Come faccio a vedere le statistiche?"){
           this.risposta = "Per visualizzare le statitische di un utente bisogna fare il login,andare nella sidebar(la sidebar si trova nella home cliccando le tre linee in alto a sinistra)"
        }
        if(x == "Come faccio ad effettuare il logout?"){
          this.risposta = "Per fare il logout bisogna cliccare nell'immagine del profilo in alto a destra e cliccare la voce <Logout>"
        }
        if(x == "Come faccio ad andare nelle impostazioni?"){
          this.risposta = "Per andare nelle impostazioni bisogna cliccare nell'immagine del profilo in alto a destra e cliccare la voce <Impostazioni>"
        }
        if(x == "Come faccio a fare l'export in excel di tutti i nomi degli utenti?"){
          this.risposta = "Per fare l'export in excel di tutti i nomi degli utenti bisogna fare il login,andare nella home e cliccare il bottone <Export Excel>"
        }
        
   }
            

  onchange(event : any){
    this.functionbot(event.value.domanda)
  }


}

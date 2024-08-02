import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

interface City {
  name: string;
  code: string;
}

interface ConversationItem {
  type: 'domanda' | 'risposta';
  text: string;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [DropdownModule, FormsModule, DialogModule, ButtonModule, InputTextModule, CommonModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {

  cities: any;
  selectedCity: any
  risposta!: any;
  visible: boolean = true;

  conversation: any[] = [];

  ngOnInit() {
    this.cities = [
      { domanda: 'Come posso accettare gli utenti?', risposta: "Per accettare gli utenti bisogna fare il login, andare nella home e cliccare il bottone <utenti da accettare>" },
      { domanda: 'Come visualizzare le attività di un utente specifico?', risposta: "Per visualizzare le attività di un utente specifico bisogna fare il login, andare nella home e cliccare il bottone <attività> su un utente in particolare" },
      { domanda: 'Come faccio a vedere le statistiche?', risposta: "Per visualizzare le statistiche di un utente bisogna fare il login, andare nella sidebar (la sidebar si trova nella home cliccando le tre linee in alto a sinistra)" },
      { domanda: 'Come faccio ad effettuare il logout?', risposta: "Per fare il logout bisogna cliccare nell'immagine del profilo in alto a destra e cliccare la voce <Logout>" },
      { domanda: 'Come faccio ad andare nelle impostazioni?', risposta: "Per andare nelle impostazioni bisogna cliccare nell'immagine del profilo in alto a destra e cliccare la voce <Impostazioni>" },
      { domanda: 'Come faccio a fare l\'export in excel di tutti i nomi degli utenti?', risposta: "Per fare l'export in excel di tutti i nomi degli utenti bisogna fare il login, andare nella home e cliccare il bottone <Export Excel>" }
    ];
  }

  functionbot(x: string) {
    for (const city of this.cities) {
      if (x === city.domanda) {
        this.conversation.push({ type: 'domanda', text: city.domanda });
        this.conversation.push({ type: 'risposta', text: city.risposta });
      }
    }
  }

  onchange(event: any) {
    if (event.value) {
      this.functionbot(event.value.domanda);
    }
  }
}

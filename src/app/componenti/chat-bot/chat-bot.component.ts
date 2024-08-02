import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CarouselModule } from 'primeng/carousel';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

import { UserTaskCreationComponent } from '../user-task-creation/user-task-creation.component';

@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [CarouselModule,ButtonModule, DialogModule, FormsModule, UserTaskCreationComponent],
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css'],
  providers:[MessageService]
})
export class ChatBotComponent implements OnInit {
  // @ViewChild('botImage') botImage!: ElementRef;
  // @Input() sidebarVisible!: boolean;

  domande: string = '';
  messaggi: { sender: string, text: string, link?: string, showButton?: boolean, buttonText?: string,isLoading?: boolean; }[] = [];
  showModal: boolean = false;

  botResponses: { [key: string]: { text: string, link?: string, showButton?: boolean, buttonText?: string } | (() => string) } = {
    "ciao!": { text: "Ciao, sono Calogero. Come posso aiutarti?" },
    "posso parlare con un operatore?":{ text: "Mi dispiace, al momento tutti i nostri operatori sono impegnati in un'altra conversazione. Chiedi a me!"},
    "come aggiungere una nuova attività?": { text: "Aggiungi attività", showButton: true },
    "come cambiare password?": { text: "Impostazioni", link: "cambio-password" },
    
    "che ore sono?": () => `Sono le ${new Date().toLocaleTimeString()}`,
    "default": { text: "Non ho capito la domanda, ci scusiamo per il disagio" }
  };

  domandePredefinite: string[] = Object.keys(this.botResponses).filter(key => key !== 'default');
  visible: boolean = false;

  constructor(private router: Router, private messageService: MessageService) {}

  ngOnInit() {
    this.messaggi = [];
  }

  inviaMessaggio() {
    if (this.domande.trim() === '') 
      return;
    
    const userMessaggio = this.domande.trim().toLowerCase();
    this.messaggi.push({ sender: 'user', text: userMessaggio });
    this.domande = '';
  
  
    if (userMessaggio === "posso parlare con un operatore?") {

      this.messaggi.push({ sender: 'bot', text: "Sto cercando di metterti in contatto con un operatore, per favore attendi...", isLoading: true });
  

      setTimeout(() => {

        this.messaggi.pop(); 
        this.messaggi.push(this.getBotRisposta(userMessaggio)); 
      }, 10000); 
    } else {
      const botReply = this.getBotRisposta(userMessaggio);
      this.messaggi.push(botReply);
      
      if (botReply.showButton){
        this.showModal = true;
      }
    }
  }
  
  
  getBotRisposta(userMessaggio: string): { sender: string, text: string, link?: string, showButton?: boolean, buttonText?: string ,isLoading?: boolean;} {
    const response = this.botResponses[userMessaggio] || this.botResponses["default"];
    
    let textResponse: string = '';
    let link: string | undefined;
    let showButton: boolean | undefined;
    let buttonText: string | undefined;
  
    if (typeof response === 'function') {
      textResponse = (response as () => string)();
    } else {
      textResponse = response.text;
      link = response.link;
      showButton = response.showButton;
      buttonText = response.buttonText;
    }
  
    return { 
      sender: 'bot', 
      text: textResponse, 
      link, 
      showButton, 
      buttonText 
    };
    
  }

  navigateToLink(link: string) {
    this.router.navigate([link]);
  }

  setDomanda(question: string) {
    this.domande = question; 
  }

  openAggiungiAttivitaModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onDialogHide() {
   
    this.domande = '';
  }
  openModal() {
    this.visible = true;
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['sidebarVisible'] && this.sidebarVisible) {
  //     setTimeout(() => {
  //       this.botImage.nativeElement.style.left = '190px';
  //     }, 0);
  //   } else {
  //     this.botImage.nativeElement.style.left = '30px';
  //   }
  // }
}

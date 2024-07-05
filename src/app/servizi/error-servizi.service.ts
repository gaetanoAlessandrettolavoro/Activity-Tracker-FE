import { Injectable } from '@angular/core';

interface Message {
  statusCode: number;
  errorMessage: {
    severity: string;
    summary: string;
    detail: string;
    key?: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ErrorServiziService {

  constructor() { }

  private messages: Message[] = [
    {
      statusCode: 0,
      errorMessage: {
        severity: 'error',
        summary: 'Errore',
        detail: 'Non è stato possibile raggiungere il server, controlla la connessione e riprova.'
      }
    },
    {
      statusCode: 1,
      errorMessage: {
        severity: 'error',
        summary: 'Errore',
        detail: 'Form non valido'
      }
    },
    {
      statusCode: 250,
      errorMessage: {
        severity: 'success',
        summary: 'Success',
        detail: 'Password cambiata con successo.'
      }
    },
    {
      statusCode: 400,
      errorMessage: {
        severity: 'error',
        summary: 'Errore 400',
        detail: 'Richiesta non valida, riprova.',
      }
    },
    {
      statusCode: 401,
      errorMessage: {
        severity: 'error',
        summary: 'Errore 401',
        detail: 'Sembra che tu non sia autenticato. Accedi per continuare.',
      }
    },
    {
      statusCode: 403,
      errorMessage: {
        severity: 'error',
        summary: 'Errore 403',
        detail: 'Non hai i permessi necessari per effettuare questa azione',
      }
    },
    {
      statusCode: 404,
      errorMessage: {
        severity: 'error',
        summary: 'Errore 404',
        detail: 'Risorsa non trovata.',
      }
    },
    {
      statusCode: 429,
      errorMessage: {
        severity: 'error',
        summary: 'Errore 429',
        detail: 'Troppi tentativi di accesso, riprova tra un\'ora'
      }
    },
    {
      statusCode: 500,
      errorMessage: {
        severity: 'error',
        summary: 'Errore 500',
        detail: 'Errore interno del server, riprova più tardi'
      }
    }
  ]

  getErrorMessage(statusCode: number): Message['errorMessage']{
    let index = this.messages.findIndex((mess: Message) => mess.statusCode === statusCode);
    let response = this.messages[index].errorMessage;
    if(!!response) {
      return response;
    }
    return {
      severity: 'error',
      summary: 'Errore',
      detail: 'Errore generico'
    }
  }
}

import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 400) {
          console.error('Qualcosa non va bene nella tua richiesta: ', err.error.message);
        } else if (err.status === 401) {   
          console.error('Sembra che tu non sia autorizzato a fare questa richiesta. Per favore, effettua il login e riprova.');
        } if (err.status === 403) {
          console.error('Non hai i permessi necessari per accedere a questa risorsa.');
        } if (err.status === 429) {
          console.error('Sembra che siano state effettuate troppe richieste. Per favore, riprova tra un\'ora.');
        } else if (err.status === 500) {
          console.error('Errore interno del server');
        } else {
          console.error('HTTP error:', err);
        }
      } else {
        console.error('An error occurred:', err);
      }
      return throwError(() => err); 
    })
  );
};

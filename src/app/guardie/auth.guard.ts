import { Router, CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { ServiceloginService } from '../servizi/servicelogin.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(ServiceloginService);
  const router = inject(Router);
  
  // controlla se l'utente è autenticato
  if (!authService.isUtente()) {
    router.navigate(['home']);
    return false;
  }
  
  //rotte amministratore
  if (state.url.startsWith('/homeadmin') || state.url.startsWith('/impostazioniadmin') || state.url.startsWith('/admin-vis-utente-specifico/:id')) {
    if (!authService.isAdmin()) {
      router.navigate(['/userhome']);
      return false;
    }
    return true;
  }
  
 //rotte utente
  if (state.url.startsWith('/userhome') || state.url.startsWith('/impostazioniutente') || state.url.startsWith('/attivitarecentiutente')) {
    if (authService.isAdmin()) {
      router.navigate(['/homeadmin']);
      return false;
    }
    return true;
  }

  
  return true;
};

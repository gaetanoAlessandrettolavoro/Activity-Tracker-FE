import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userGuard: CanActivateFn = (route, state) => {


  const router = inject(Router);
  if (!localStorage.getItem("utente") && !localStorage.getItem("admin")) {
    return true;
  } else {
    router.navigate(['/userhome']);
    return false;
  }
};

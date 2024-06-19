authuser ts


import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authuserGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  if (localStorage.getItem("utente") && !localStorage.getItem("admin")) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};
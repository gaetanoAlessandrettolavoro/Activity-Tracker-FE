import { Router, CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  
   
  if (localStorage.getItem("admin")) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};


import { Router, CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { ServiceloginService } from '../servizi/servicelogin.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(ServiceloginService);
  const router = inject(Router);

  
   
  if (localStorage.getItem("admin")) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};


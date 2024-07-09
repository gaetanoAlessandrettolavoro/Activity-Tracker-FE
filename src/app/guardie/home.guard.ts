import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const homeGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);



  if (!localStorage.getItem("admin")) {
    return true;
  } else {
    router.navigate(['/dash-admin']);
    return false;
  }
};

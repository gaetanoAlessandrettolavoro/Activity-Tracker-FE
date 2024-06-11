import { Router, CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { ServiceloginService } from '../servizi/servicelogin.service';


export const authGuard: CanActivateFn = (route:any, state:any) => {

  const authService = inject(ServiceloginService)
  const router = inject(Router)
  if (localStorage.getItem('admin')) {
   return true;
  }
  if (state.url === '/homeadmin') {
    router.navigate(['/home']);
  }
  return true;
 

};

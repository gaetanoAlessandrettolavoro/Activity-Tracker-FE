import { Router, CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';

export const bothRolesGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);

    if(localStorage.getItem("admin") || localStorage.getItem("utente")) {
        return true;
    } else {
        return false;
    }
}
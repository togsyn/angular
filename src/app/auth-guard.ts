import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {

  const router = inject(Router);

  const isLoggedIn =
    localStorage.getItem('isLoggedIn');

  if (isLoggedIn) {

    return true;

  } else {

    router.navigate(['/']);

    return false;

  }
};
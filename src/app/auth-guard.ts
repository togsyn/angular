import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  // Get token from localStorage
  const token = localStorage.getItem('access_token');

  if (token) {
    // Optional: decode token and check expiry
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp * 1000; // exp is in seconds
    const now = Date.now();

    if (expiry > now) {
      return true; // token is valid
    } else {
      // expired → clear and redirect
      localStorage.removeItem('access_token');
      router.navigate(['/login']);
      return false;
    }
  }

  // No token → redirect
  router.navigate(['/login']);
  return false;
};

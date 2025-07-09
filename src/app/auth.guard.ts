import { inject, Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthGoogleService } from '../services/auth-google/auth-google.service';
import type { User } from '../models/user/user.interface';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService: AuthGoogleService = inject(AuthGoogleService);
  const router: Router = inject(Router);

  const loggedProfile: User = loginService.getLoggedProfile()

  if(!loggedProfile) {
    router.navigate(['']);
    return false;
  }
  
  return true;
};

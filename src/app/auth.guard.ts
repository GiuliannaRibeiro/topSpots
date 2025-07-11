import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

export const authGuard: CanActivateFn = () => {
  const loginService = inject(OAuthService);
  const router: Router = inject(Router);

  if (!loginService.hasValidAccessToken()) {
    router.navigate(['']);
    return false;
  }

  return true;
};

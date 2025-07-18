import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideOAuthClient } from 'angular-oauth2-oidc'
import { provideLottieOptions } from 'ngx-lottie';
import { playerFactory } from './lottie-player-factory';
import { APP_INITIALIZER } from '@angular/core';
import { initializeAuth } from './auth-initializer';
import { OAuthService } from 'angular-oauth2-oidc';
import { importProvidersFrom } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideHttpClient(withFetch()),
    provideOAuthClient(),
    provideLottieOptions({ player: playerFactory }),
    importProvidersFrom(MatSnackBarModule),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAuth,
      deps: [OAuthService],
      multi: true
    }, provideAnimationsAsync()
  ]
};

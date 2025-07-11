import { OAuthService } from 'angular-oauth2-oidc';
import { auth } from '../../auth.config';

export function initializeAuth(oauthService: OAuthService): () => Promise<void> {
  return async () => {
    oauthService.setStorage(localStorage);
    oauthService.configure(auth);
    oauthService.setupAutomaticSilentRefresh();
    await oauthService.loadDiscoveryDocumentAndTryLogin();
  };
}

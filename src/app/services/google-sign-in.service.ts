import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleSignInService {

  constructor(private oauthService: OAuthService) { 
    this.configureGoogle();
  }
  configureGoogle() {
    this.oauthService.configure({
      clientId: environment.googleClientId,
      redirectUri: window.location.origin + '/index.html',
      scope: 'openid profile email',
      oidc: true,
      strictDiscoveryDocumentValidation: false,
      responseType: 'id_token token',
    });
  }

  signInWithGoogle() {
    this.oauthService.initImplicitFlow();
  }

  signOut() {
    this.oauthService.logOut();
  }
}

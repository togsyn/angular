import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { APP_INITIALIZER } from '@angular/core';
import { routes } from './app.routes';

// Keycloak initializer function
function initializeKeycloak(keycloak: KeycloakService) {
  return async () => {
    await keycloak.init({
      config: {
        url: 'http://localhost:8084',   // Keycloak base URL
        realm: 'togsyn',                // your realm name
        clientId: 'web-app'             // your client ID
      },
      initOptions: {
        onLoad: 'login-required',       // force login at startup
        checkLoginIframe: false
      },
      bearerExcludedUrls: ['/assets']   // exclude static files
    });
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(KeycloakAngularModule),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ]
};

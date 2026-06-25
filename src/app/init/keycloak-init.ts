import { KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService) {
  return async () => {
    await keycloak.init({
      config: {
        url: 'http://localhost:8084', // Keycloak base URL
        realm: 'togsyn',
        clientId: 'web-app'
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false
      },
      bearerExcludedUrls: ['/assets']
    });
  };
}

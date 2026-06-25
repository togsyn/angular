import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';       // for [routerLink]
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './side-menu.html',
  styleUrls: ['./side-menu.scss']
})
export class SideMenuComponent {
  user = JSON.parse(localStorage.getItem('user') || '{}');

  logout() {
      const realm = 'togsyn';
      const clientId = 'web-app';
      const keycloakUrl = 'http://localhost:8084';
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      window.location.href =
        `${keycloakUrl}/realms/${realm}/protocol/openid-connect/logout?client_id=${clientId}&post_logout_redirect_uri=http://localhost:4200`;
    }
}

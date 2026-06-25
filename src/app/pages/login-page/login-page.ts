import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})
export class LoginComponent {

  email = '';
  password = '';

  loading = false;
  showPassword = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter email and password';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const tokenUrl = 'http://localhost:8084/realms/togsyn/protocol/openid-connect/token';

    const body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('client_id', 'web-app');
    body.set('username', this.email);
    body.set('password', this.password);

    this.http.post<any>(tokenUrl, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).subscribe({
      next: (response) => {
        this.loading = false;
        alert('Login Successful');

        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);

        const decoded: any = jwtDecode(response.access_token);

        const roles: string[] = decoded?.realm_access?.roles || [];
        const appRoles = roles.filter(r => r === 'student' || r === 'teacher');

        if (!appRoles || appRoles.length === 0) {
          this.router.navigate(['/dashboard/more-information']);
        } else {
          // Role exists → pass role in URL or state
          const role = roles[0]; // e.g. "Student" or "Teacher"
          this.router.navigate(['/dashboard'], { queryParams: { role } });
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.error_description || 'Invalid credentials';
      }
    });
  }
}

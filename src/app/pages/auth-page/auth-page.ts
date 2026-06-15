import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './auth-page.html',
  styleUrl: './auth-page.scss'
})
export class AuthPage {

  username: string = '';
  password: string = '';

  errorMessage: string = '';
  loading: boolean = false;

  showPassword: boolean = false;

  constructor(private router: Router) {}

  login() {

    this.errorMessage = '';

    if (!this.username || !this.password) {

      this.errorMessage = 'Please fill all fields';
      return;

    }

    this.loading = true;

    setTimeout(() => {

      if (
        this.username === 'admin' &&
        this.password === '1234'
      ) {

        localStorage.setItem('isLoggedIn', 'true');

        this.router.navigate(['/dashboard']);

      } else {

        this.errorMessage = 'Invalid Username or Password';

      }

      this.loading = false;

    }, 1000);
  }

  togglePassword() {

    this.showPassword = !this.showPassword;

  }
}
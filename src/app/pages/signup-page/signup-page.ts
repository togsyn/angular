import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup-page.html',
  styleUrl: './signup-page.scss'
})
export class SignupPage {

  fullname = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  signup() {
    if (!this.fullname || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'All fields are required';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.http.post('http://localhost:8080/api/auth/signup', {
      fullname: this.fullname,
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        alert('Account created successfully! Please log in.');
        this.router.navigate(['/auth-page']);
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Registration failed';
      }
    });
  }
}

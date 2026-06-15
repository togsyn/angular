import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup-page.html',
  styleUrl: './signup-page.scss'
})
export class SignupPage {

  fullname = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(private router: Router, private http: HttpClient) {}

  signup() {
    if (!this.fullname || !this.email || !this.password || !this.confirmPassword) {
      alert('Please fill all fields');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const user = {
      fullname: this.fullname,
      email: this.email,
      password: this.password
    };

    this.http.post('http://localhost:8080/users/register', user)
      .subscribe({
        next: (response) => {
          alert('Signup successful!');
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          alert('Signup failed: ' + err.message);
        }
      });
  }
}

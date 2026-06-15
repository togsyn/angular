import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

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

  constructor(private router: Router) {}

  signup() {

    if (
      !this.fullname ||
      !this.email ||
      !this.password ||
      !this.confirmPassword
    ) {
      alert('Please fill all fields');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    this.router.navigate(['/dashboard']);
  }
}

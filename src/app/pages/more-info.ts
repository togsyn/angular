import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-more-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './more-info.html',
  styleUrls: ['./more-info.scss']
})
export class MoreInformation implements OnInit {

  tempUser: any;

  phone = '';
  gender = '';
  dob = '';
  role = '';
  country = '';
  state = '';
  city = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const data = localStorage.getItem('tempUser');

    if (!data) {
      this.router.navigate(['/signup']);
      return;
    }

    this.tempUser = JSON.parse(data);
  }

  submit() {

    if (!this.phone || !this.gender || !this.dob || !this.role || !this.country || !this.state || !this.city) {
      alert('Fill all details');
      return;
    }

    const user = {
      ...this.tempUser,
      phone: this.phone,
      gender: this.gender,
      dob: this.dob,
      role: this.role,
      address: {
        country: this.country,
        state: this.state,
        city: this.city
      }
    };

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.removeItem('tempUser');

    this.router.navigate(['/dashboard']);
  }
}
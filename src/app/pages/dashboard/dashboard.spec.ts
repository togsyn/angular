import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';  // ✅ Add this

import { MoreInfoComponent } from '../more-info/more-information';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,        // ✅ Required for router directives
    MoreInfoComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {}

  countryCode = '+91';
  phone = '';

  country = '';
  state = '';
  city = '';
  role = 'student';

  showExperience = false;
  experience = '';

  experienceList = Array.from({ length: 30 }, (_, i) => i + 1);

  countries = [
    { name: 'India', states: ['Maharashtra', 'Telangana'] },
    { name: 'USA', states: ['California', 'Texas'] }
  ];

  states: string[] = [];
  cities: string[] = [];

  onCountryChange() {
    const c = this.countries.find(x => x.name === this.country);
    this.states = c ? c.states : [];
    this.cities = [];
  }

  onStateChange() {
    if (this.state === 'Maharashtra') {
      this.cities = ['Mumbai', 'Pune'];
    } else if (this.state === 'Telangana') {
      this.cities = ['Hyderabad', 'Warangal'];
    } else {
      this.cities = [];
    }
  }

  onRoleChange() {
    this.showExperience = this.role === 'teacher';
  }

  save() {
    console.log({
      phone: this.countryCode + this.phone,
      country: this.country,
      state: this.state,
      city: this.city,
      role: this.role,
      experience: this.experience
    });

    alert('Profile Saved Successfully!');
  }

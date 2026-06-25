import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LocationService } from '../../services/location.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { SkillService } from '../../services/skill.service';

@Component({
  selector: 'app-more-info',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule],
  templateUrl: './more-information.html',
  styleUrls: ['./more-information.scss']
})
export class MoreInfoComponent implements OnInit {

  // ================= USER =================
  email: string = '';
  selectedRole: string = '';
  phone: string = '';
  gender: string = '';

  // ✅ FIXED SPELLING
  qualification: string = '';
  subject: string = '';
  description: string = '';

  budgetAmount: number | null = null;
  budgetType: string = '';

  // ================= LOCATION =================
  addressLine1: string = '';
  addressLine2: string = '';
  zipCode: string = '';
  selectedCountry: string = '';
  selectedState: string = '';
  selectedCity: string = '';

  countries: string[] = [];
  states: string[] = [];
  cities: string[] = [];

  // ================= EXPERIENCE =================
  selectedExperience: number | null = null;
  // ================= NOTIFICATIONS =================
smsNotifications: boolean = false;
emailNotifications: boolean = false;


  // ================= SKILLS =================
  skills: any[] = [];
  subSkillsList: any[] = [];
  selectedSkill: number | null = null;
  selectedSubSkills: number[] = [];

  constructor(
    private router: Router,
    private locationService: LocationService,
    private http: HttpClient,
    private skillService: SkillService
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.email = user.email || '';

    this.loadSkills();
    this.loadCountries();
  }

  // ================= SKILLS =================
 loadSkills(): void {
  this.skillService.getSkills().subscribe({
    next: (data) => this.skills = data,
    error: (err) => console.error(err)
  });
}



  onSkillChange(skillId: number): void {
    this.selectedSubSkills = [];
    this.subSkillsList = [];

    this.skillService.getSubSkills(skillId).subscribe({
      next: (data) => this.subSkillsList = data,
      error: (err) => console.error(err)
    });
  }

  // ================= LOCATION =================
  loadCountries(): void {
    this.locationService.getCountries().subscribe({
      next: (data) => this.countries = data,
      error: (err) => console.error(err)
    });
  }

  onCountryChange(): void {
    this.states = [];
    this.cities = [];

    this.locationService.getStates(+this.selectedCountry).subscribe({
      next: (data) => this.states = data,
      error: (err) => console.error(err)
    });
  }

  onStateChange(): void {
    this.cities = [];

    this.locationService.getCities(+this.selectedState).subscribe({
      next: (data) => this.cities = data,
      error: (err) => console.error(err)
    });
  }


  // ================= SAVE =================
  saveChanges(): void {

    if (!this.email) {
      alert("Email missing. Please login again.");
      return;
    }

    const payload = {
      email: this.email,
      userName: JSON.parse(localStorage.getItem('user') || '{}').fullname,


    role: this.selectedRole,
    gender: this.gender,
    phone: this.phone,
    experience: this.selectedExperience,

    qualification: this.qualification,
    subject: this.subject,
    description: this.description,

    budgetAmount: this.budgetAmount,
    budgetType: this.budgetType,

    addressLine1: this.addressLine1,
    addressLine2: this.addressLine2,
    zipCode: this.zipCode,
    country: this.selectedCountry,
    state: this.selectedState,
    city: this.selectedCity,
    skills: this.selectedSkill,
    subSkills: this.selectedSubSkills,

    // ✅ Notification flags must be inside the object
    smsNotifications: this.smsNotifications,
    emailNotifications: this.emailNotifications
  };

    console.log("FINAL PAYLOAD:", payload);

    this.http.post(
      'http://localhost:8080/users/more-information',
      payload,
      { responseType: 'text' }
    )
    .subscribe({
      next: (res) => {
        console.log("SUCCESS:", res);
        alert(res);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error("ERROR:", err);
        alert(err?.error?.error || 'Failed To Save Details');
      }
    });
  }

  cancelChanges(): void {
    console.log('Cancelled');
  }
}

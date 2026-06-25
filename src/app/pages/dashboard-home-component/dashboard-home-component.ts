import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';       // for *ngIf, *ngFor
import { FormsModule } from '@angular/forms';         // for [(ngModel)]
import { RouterModule } from '@angular/router';       // for [routerLink]
import { DashboardService } from '../../services/dashboard.service';
import { LocationService } from '../../services/location.service';
import { SkillService } from '../../services/skill.service';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-dashboard-home-component',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './dashboard-home-component.html',
  styleUrls: ['./dashboard-home-component.css'],
})

export class DashboardHomeComponent implements OnInit {

  user: any = { role: '', fullname: 'Test User' };
  users: any[] = [];
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  skills: any[] = [];
  subSkills: any[] = [];

  currentPage = 0;
  pageSize = 5;
  totalPages = 0;
  isLoading = false;
  showSubskills: boolean = false;

  filters: any = {
    subject: '',
    skill: '',
    state: '',
    city: '',
    country: '',
    gender: '',
    budget: '',
subskills: []
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    private locationService: LocationService,
    private skillService: SkillService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const roleParam = this.route.snapshot.queryParamMap.get('role') || 'Student';
    this.user.role = roleParam;
    this.loadOppositeUsers(0, roleParam);
    this.loadMasterData();
  }

  loadOppositeUsers(page: number = 0, role: string = this.user.role) {
    if (!role) return;
    this.isLoading = true;
    this.dashboardService.getOppositeUsers(role, this.filters, page, this.pageSize).subscribe({
      next: (res: any) => {
        this.users = res.content || [];
        this.totalPages = res.totalPages || 0;
        this.currentPage = res.number || 0;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('API Error:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  searchOppositeUsers() {
    this.loadOppositeUsers(0, this.user.role);
  }


  loadMasterData() {
    this.locationService.getCountries().subscribe((data: any[]) => this.countries = data);
    this.skillService.getSkills().subscribe((data: any[]) => this.skills = data);
  }

  // ✅ dependent dropdowns
  onCountryChange(countryId: string) {
    if (!countryId) {
      this.states = [];
      this.cities = [];
      return;
    }
    this.locationService.getStates(+countryId).subscribe((data: any[]) => {
      this.states = data;
      this.cities = [];
    });
  }

  onStateChange(stateId: string) {
    if (!stateId) {
      this.cities = [];
      return;
    }
    this.locationService.getCities(+stateId).subscribe((data: any[]) => {
      this.cities = data;
    });
  }

  onSkillChange(skillId: string) {
    if (!skillId) {
      this.subSkills = [];
      return;
    }
    const selectedSkill = this.skills.find(s => s.id === +skillId);
    this.subSkills = selectedSkill?.subSkills || [];
  }



  toggleSubskill(id: number, event: Event): void {
  const checked = (event.target as HTMLInputElement).checked;
  if (checked) {
    this.filters.subskills.push(id);
  } else {
    this.filters.subskills = this.filters.subskills.filter((x: number) => x !== id);
  }
}


}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  /* EDIT BUTTON */
  isEditing = false;

  /* SIDEBAR SECTION */
  selectedSection = 'students';

  /* SEARCH + FILTERS */
  searchText = '';
  selectedCountry = '';
  selectedGender = '';

  /* RIGHT SIDE DETAILS */
  selectedStudent: any = null;

  /* STUDENTS */
  students = [

    {
      id: 1,
      name: 'John Doe',
      status: 'Active',
      country: 'India',
      city: 'Hyderabad',
      gender: 'Male',
      skills: 'Angular, Java',
      lastActive: new Date()
    },

    {
      id: 2,
      name: 'Sara Smith',
      status: 'Pending',
      country: 'USA',
      city: 'New York',
      gender: 'Female',
      skills: 'React, Spring Boot',
      lastActive: new Date()
    }

  ];

  /* SIDEBAR */
  showSection(section: string) {
    this.selectedSection = section;
  }

  /* EDIT BUTTON */
  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  /* STUDENT DETAILS */
  selectStudent(student: any) {
    this.selectedStudent = student;
  }
  closeDetails() {
  this.selectedStudent = null;
  
}

  /* SEARCH FILTER */
  filteredStudents() {

    return this.students.filter((s) => {

      const matchesSearch =

        s.name.toLowerCase().includes(this.searchText.toLowerCase()) ||

        s.city.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesCountry =

        this.selectedCountry === '' ||
        s.country === this.selectedCountry;

      const matchesGender =

        this.selectedGender === '' ||
        s.gender === this.selectedGender;

      return matchesSearch &&
             matchesCountry &&
             matchesGender;

    });

  }

  /* TIME */
  getTimeAgo(date: Date): string {

    const seconds = Math.floor(
      (new Date().getTime() - new Date(date).getTime()) / 1000
    );

    if (seconds < 60) {
      return 'just now';
    }

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) {
      return `${minutes} min ago`;
    }

    const hours = Math.floor(minutes / 60);

    return `${hours} hrs ago`;
  }

}
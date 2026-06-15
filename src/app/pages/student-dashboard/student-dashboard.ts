import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-dashboard.html',
  styleUrls: ['./student-dashboard.css']
})
export class StudentDashboardComponent {

  searchText = '';

  students = [
    {
      id: 1,
      name: 'John Doe',
      status: 'Active',
      country: 'India',
      city: 'Hyderabad',
      gender: 'Male',
      skills: 'Algebra, Geometry',
      studentContacted: true,
      teacherContacted: false,
      lastActive: new Date(),
      phone: '+91 9876543210',
      email: 'john@gmail.com',
      address: 'Hyderabad'
    },

    {
      id: 2,
      name: 'Sara Smith',
      status: 'Pending',
      country: 'USA',
      city: 'New York',
      gender: 'Female',
      skills: 'Physics',
      studentContacted: false,
      teacherContacted: true,
      lastActive: new Date(),
      phone: '+1 987654321',
      email: 'sara@gmail.com',
      address: 'New York'
    }
  ];

  constructor(private router: Router) {}

  filteredStudents() {
    return this.students.filter((s) =>

      s.name.toLowerCase().includes(this.searchText.toLowerCase()) ||

      s.country.toLowerCase().includes(this.searchText.toLowerCase()) ||

      s.city.toLowerCase().includes(this.searchText.toLowerCase()) ||

      s.gender.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  viewStudent(id: number) {
    this.router.navigate(['/student', id]);
  }

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

    if (hours < 24) {
      return `${hours} hrs ago`;
    }

    const days = Math.floor(hours / 24);

    return `${days} days ago`;
  }

}
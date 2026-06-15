import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-details.html',
  styleUrls: ['./student-details.css']
})
export class StudentDetailsComponent {

  studentId: any;

  students = [

    {
      id: 1,
      name: 'Rahul',
      gender: 'Male',
      country: 'India',
      city: 'Hyderabad',
      email: 'rahul@gmail.com',
      phone: '9876543210',
      skills: 'Angular'
    },

    {
      id: 2,
      name: 'Priya',
      gender: 'Female',
      country: 'USA',
      city: 'Dallas',
      email: 'priya@gmail.com',
      phone: '9999999999',
      skills: 'Java'
    }

  ];

  student: any;

  constructor(private route: ActivatedRoute){

    this.studentId =
      this.route.snapshot.paramMap.get('id');

    this.student =
      this.students.find(
        s => s.id == this.studentId
      );

  }

}
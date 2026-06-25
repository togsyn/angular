import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-details.html',   // 👈 Correct file
  styleUrls: ['./view-details.css']    // 👈 Optional if you have styles
})
export class ViewDetailsComponent implements OnInit {
  student: any = null;

  students = [
    {
      id: 1,
      name: 'Rakshitha',
      email: 'rakshitha@gmail.com',
      contact: '9876543210',
      description: 'Web developer skilled in Angular.',
      status: 'Active',
      country: 'India',
      city: 'Hyderabad',
      gender: 'Female',
      subject: 'Web Developer',
      skills: 'Angular'
    },
    {
      id: 2,
      name: 'Rahul',
      email: 'rahul@gmail.com',
      contact: '1234567890',
      description: 'Java developer with backend expertise.',
      status: 'Offline',
      country: 'USA',
      city: 'Dallas',
      gender: 'Male',
      subject: 'Java Developer',
      skills: 'Java'
    }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.student = this.students.find(s => s.id === id);
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-more-information',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './more-information.html',
  styleUrl: './more-information.scss'
})
export class MoreInformation {

  qualification = '';
  experience = '';
  address = '';
  skills = '';

  constructor(private router: Router) {}

  submitForm() {

    alert('More Information Saved Successfully');

    this.router.navigate(['/dashboard']);

  }

  goBack() {

    this.router.navigate(['/dashboard']);

  }
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-more-information',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './more-information.html',
  styleUrl: './more-information.scss'
})
export class MoreInformation {}
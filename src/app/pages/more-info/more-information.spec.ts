import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-more-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './more-information.html',
  styleUrls: ['./more-information.scss']
})

export class MoreInfoComponent {

  onSkillChange(skill: any) {
  this.selectedSkill = skill;
}

}
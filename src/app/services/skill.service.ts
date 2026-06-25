import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private baseUrl = 'http://localhost:8080/users';
  private skillUrl = 'http://localhost:8080/api/skills';
  private locationUrl = 'http://localhost:8080/api/location';


  constructor(private http: HttpClient) {}

  // Get all skills for a user
 getSkills(): Observable<any[]> {
  return this.http.get<any[]>(`${this.skillUrl}`);
}
getSubSkills(skillId: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.skillUrl}/${skillId}/subskills`);
}



  // ✅ Add a skill for a user
  addSkill(userId: number, skill: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${userId}/skills`, skill);
  }

  // ✅ Add a subskill for a skill
  addSubSkill(skillId: number, subskill: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/skills/${skillId}/subskills`, subskill);
  }
}

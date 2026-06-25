import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocationService {

  baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}
getCountries() {
  return this.http.get<string[]>('http://localhost:8080/api/countries');
}

// location.service.ts
getStates(countryId: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/states/${countryId}`);
}

getCities(stateId: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/cities/${stateId}`);
}

// skill.service.ts


}

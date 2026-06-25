import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoreInformationService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  saveMoreInfo(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/more-info`, data);
  }

 getStates(countryId: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/states/${countryId}`);
}
getCities(stateId: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/cities/${stateId}`);
}


}
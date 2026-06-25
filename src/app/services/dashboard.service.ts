import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'http://localhost:8080/users/dashboard';

  constructor(private http: HttpClient) {}


  getOppositeUsers(role: string, filters: any = {}, page: number = 0, size: number = 10): Observable<any> {
    let params = new HttpParams()
      .set('role', role)
      .set('page', page)
      .set('size', size);

    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        params = params.set(key, filters[key]);
      }
    });

    return this.http.get(this.apiUrl, { params });
  }
}

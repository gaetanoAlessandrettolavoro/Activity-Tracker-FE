import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityUserService {

  constructor(private http: HttpClient) { }

  getActivities(userId: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/v1/users/${userId}/activities`,{ withCredentials: true });
  }
}

export interface Activity {
  taskName: string;
  activityDate: string;
  startTime: string;
  endTime: string;
  notes: string;
}

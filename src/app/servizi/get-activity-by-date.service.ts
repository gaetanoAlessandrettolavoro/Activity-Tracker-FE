import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetActivityByDateService {

  constructor(private http: HttpClient) { }

  getByDate(date: Date) {
    const dateToSend = date.toISOString().split('T')[0];
    return this.http.get(`http://localhost:3000/api/v1/activities/me?activityDate=${dateToSend}`, { withCredentials: true });
  }

  getDaily() {
    const dateToSend = new Date().toISOString().split('T')[0];
    return this.http.get(`http://localhost:3000/api/v1/activities/me?activityDate=${dateToSend}`, { withCredentials: true });
  }
}

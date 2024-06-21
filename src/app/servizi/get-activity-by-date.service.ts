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
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

console.log(formattedDate)
    const yearuno = currentDate.getFullYear();
const monthuno = String(currentDate.getMonth() + 1).padStart(2, '0');
const dayuno = String(currentDate.getDate() + 1).padStart(2, '0');
const formattedNextDay = `${yearuno}-${monthuno}-${dayuno}`;


    return this.http.get(`http://localhost:3000/api/v1/activities/me?startTime[gte]=${formattedDate}&startTime[lt]=${formattedNextDay}&isActive=true`, { withCredentials: true });
  }
}

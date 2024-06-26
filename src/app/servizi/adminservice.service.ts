import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/userModel';

@Injectable({
  providedIn: 'root',
})
export class AdminserviceService {
  constructor(private http: HttpClient) {}

  protected apiUrl = 'http://localhost:3000/api/v1/users'; // URL dell'API

  getUsers(parameter?: {
    limit?: number;
    pageNumber?: number;
  }): Observable<any> {
    if (parameter?.limit && !parameter?.pageNumber) {
      return this.http.get<any>(`${this.apiUrl}?limit=${parameter?.limit}`, {
        withCredentials: true,
      });
    } else if (parameter?.pageNumber && !parameter?.limit) {
      return this.http.get<any>(
        `${this.apiUrl}?page=${parameter?.pageNumber}`,
        { withCredentials: true },
      );
    }
    if (parameter?.limit && parameter.pageNumber) {
      return this.http.get<any>(
        `${this.apiUrl}?limit=${parameter?.limit}&page=${parameter?.pageNumber}`,
        { withCredentials: true },
      );
    }
    return this.http.get<any>(this.apiUrl, { withCredentials: true });
  }

  getOneUser(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, {
      withCredentials: true,
    });
  }

    getOneUserActivity(data: any,pageNumber : any,limit:any): Observable<any> {
      return this.http.get<any>(`http://localhost:3000/api/v1/users/${data}/activities?page=${pageNumber}&limit=${limit}&isActive=true`,{ withCredentials: true })
    }

  patchUser(id: string, data: User): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<any>(url, data, { withCredentials: true });
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  addTask(typeActivityData: string) {
    let apiUrl = 'http://localhost:3000/api/v1/tasks'; // URL dell'API
    return this.http.post(
      apiUrl,
      { taskName: typeActivityData },
      { withCredentials: true },
    );
  }

  getAllUsersActivities(page: number, limit: number) {
    let apiUrl = 'http://localhost:3000/api/v1/activities';
    return this.http.get(
      `${apiUrl}?page=${page}&limit=${limit}&sort=_id`,
      { withCredentials: true },
    );
  }

  getActivitiesByDate(parameter? : {date?: Date,pageNumber? : number,limit?:number}) {
    const apiUrl = 'http://localhost:3000/api/v1/activities/me?startTime[gte]=';
    let currentDate!: Date;
    if(!!parameter?.date) {
      currentDate = parameter.date;
    } else {
      currentDate = new Date();
    }
    const today = currentDate.toISOString().split('T')[0];
    const [year, month, day] = today.split('-');
    const tomorrow = new Date(parseInt(year), parseInt(month)-1, parseInt(day)+2).toISOString().split('T')[0];
    return this.http.get(`${apiUrl}${today}&startTime[lt]=${tomorrow}&page=${parameter?.pageNumber}&limit=${parameter?.limit}&isActive=true&sort=-startTime`, { withCredentials: true });
  }
}









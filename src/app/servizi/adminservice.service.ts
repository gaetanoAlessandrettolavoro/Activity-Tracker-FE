import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/userModel';
import { alias } from './defines';

@Injectable({
  providedIn: 'root',
})
export class AdminserviceService {
  token = localStorage.getItem('token');

  header= {authorization: `Bearer ${this.token}`}

  constructor(private http: HttpClient) {}

  protected apiUrl = `http://${alias}:3000/api/v1/users`; // URL dell'API

  getUsers(parameter?: {
    limit?: number;
    pageNumber?: number;
  }): Observable<any> {
    if (parameter?.limit && !parameter?.pageNumber) {
      return this.http.get<any>(`${this.apiUrl}?limit=${parameter?.limit}&isActive=true&isAccepted=true`, { headers: this.header });
    } else if (parameter?.pageNumber && !parameter?.limit) {
      return this.http.get<any>(
        `${this.apiUrl}?page=${parameter?.pageNumber}&isActive=true&isAccepted=true`,
        { headers: this.header },
      );
    }
    if (parameter?.limit && parameter.pageNumber) {
      return this.http.get<any>(
        `${this.apiUrl}?limit=${parameter?.limit}&page=${parameter?.pageNumber}&isActive=true&isAccepted=true`,
        { headers: this.header },
      );
    }
    return this.http.get<any>(this.apiUrl, { headers: this.header });
  }

  getOneUser(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.header });
  }

    getOneUserActivity(data: any,pageNumber : any,limit:any): Observable<any> {
      return this.http.get<any>(`http://${alias}:3000/api/v1/users/${data}/activities?page=${pageNumber}&limit=${limit}&isActive=true&sort=-startTime`,{ headers: this.header })
    }

  patchUser(id: string, data: User): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<any>(url, data, { headers: this.header });
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.header });
  }

  addTask(task: {taskName: string, expectedHours: number}) {
    let apiUrl = `http://${alias}:3000/api/v1/tasks`; // URL dell'API
    return this.http.post(apiUrl, task, { headers: this.header });
  }

  getAllUsersActivities(page: number, limit: number, active?: boolean, taskName?: string, fromDate?: string, toDate?: string) {
    let apiUrl = `http://${alias}:3000/api/v1/activities?`;
    let params = `page=${page}&limit=${limit}&sort=_id`;
  
    if (active !== undefined) {
      params += `&isTaskActive=${active}`;
    }
    if (taskName) {
      params += `&taskName=${taskName}`;
    }
    if (fromDate) {
      params += `&startTime[gte]=${fromDate}`;
    }
    if (toDate) {
      params += `&endTime[lte]=${toDate}`;
    }
  
    return this.http.get(`${apiUrl}${params}`, { headers: this.header });
}

  
  
  

  getActivitiesByDate(parameter? : {date?: Date,pageNumber? : number,limit?:number}) {
    const apiUrl = `http://${alias}:3000/api/v1/activities/me?startTime[gte]=`;
    let currentDate!: Date;
    if(!!parameter?.date) {
      currentDate = parameter.date;
    } else {
      currentDate = new Date();
    }
    const today = currentDate.toISOString().split('T')[0];
    const [year, month, day] = today.split('-');
    const tomorrow = new Date(parseInt(year), parseInt(month)-1, parseInt(day)+2).toISOString().split('T')[0];
    return this.http.get(`${apiUrl}${today}&startTime[lt]=${tomorrow}&page=${parameter?.pageNumber}&limit=${parameter?.limit}&isActive=true&sort=-startTime`, { headers: this.header });
  }

  isAccetpedFalse(){
    const apiUrll = `http://${alias}:3000/api/v1/users?isAccepted=false&isActive=true`
    return this.http.get<any>(apiUrll,{ headers: this.header });
  }

  acceptedUser(id: any) {
    return this.http.patch<any>(`http://${alias}:3000/api/v1/users/changeStatus/${id}?uri=${alias}`,{isAccepted: true,isActive:true},{ headers: this.header });
  }

  rejectUser(id: any) {
   return this.http.patch<any>(`http://${alias}:3000/api/v1/users/changeStatus/${id}`,{isAccepted: false,isActive:false},{ headers: this.header });
  }
}

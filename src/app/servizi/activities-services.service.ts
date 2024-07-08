import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from '../models/activityModel';
import { Task } from '../models/taskModel';
import { alias } from './defines';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesServicesService {
  token = localStorage.getItem('token');

  header= {authorization: `Bearer ${this.token}`}

  constructor(private httpclient:HttpClient) { }
  private apiUrl = `http://${alias}:3000/api/v1/activities/me`; 


  getActivities(parameters?: { pageNumber?: number, limit?: number, fromDate?: string, toDate?: string,  taskName?: string }): Observable<any> {
    let url = `${this.apiUrl}?isActive=true`;
  
    if (parameters?.limit) {
      url += `&limit=${parameters.limit}&sort=-startTime`;
    }
    if (parameters?.pageNumber) {
      url += `&page=${parameters.pageNumber}&sort=-startTime`;
    }

    if (parameters?.fromDate) {
      url += `&startTime[gte]=${parameters.fromDate}`;
    }
    if (parameters?.toDate) {
      url += `&endTime[lte]=${parameters.toDate}`;
    }
    
    if (parameters?.taskName) {
      url += `&taskName=${parameters.taskName}`;
    }
  
    return this.httpclient.get<any>(url, { headers: this.header });
}

getActivitiesToChart(parameters: {fromDate: string, taskName: string}){
  const nextDay = new Date(parseInt(parameters.fromDate.split('-')[0]), parseInt(parameters.fromDate.split('-')[1])-1, parseInt(parameters.fromDate.split('-')[2])+3).toISOString().split('T')[0];
  return this.httpclient.get(`http://${alias}:3000/api/v1/activities?taskName=${parameters.taskName}&startTime[gte]=${parameters.fromDate}&startTime[lt]=${nextDay}&isActive=true`, {headers: this.header})
}
  

  getOneActivity(id: string) {
    let apiUrl = `http://${alias}:3000/api/v1/activities/`;
    return this.httpclient.get(`${apiUrl}${id}`, {headers: this.header});
  }

  getActivityByTaskID(taskID: Task["_id"]) {
    let apiUrl = `http://${alias}:3000/api/v1/activities?taskID=${taskID}&isActive=true`;
    return this.httpclient.get(apiUrl, {headers: this.header})
  }

  createActivity(activity: Activity, userID?: string): Observable<any> {
    const apiUrl = `http://${alias}:3000/api/v1/activities`;;
        const activityToSend = { ...activity, userID: userID };
        return this.httpclient.post(apiUrl, activityToSend, { headers: this.header });
  }

  updateActivities(activity: Activity, id?: string): Observable<any> {
    if(!id) {
      throw new Error('Id is required');
    }
    const url = `http://${alias}:3000/api/v1/activities/${id}`;
    return this.httpclient.patch(url, activity, {headers: this.header});
  }

  deleteActivity(activityID: string): Observable<any>{
    const apiUrl = `http://${alias}:3000/api/v1/activities/`;
    return this.httpclient.delete(apiUrl+activityID, { headers: this.header });
  }
    
  }



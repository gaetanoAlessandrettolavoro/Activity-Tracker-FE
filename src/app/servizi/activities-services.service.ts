import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from '../models/activityModel';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesServicesService {

  constructor(private httpclient:HttpClient) { }
  private apiUrl = 'http://localhost:3000/api/v1/activities/me'; 


  getActivities(parameters?: { pageNumber?: number, limit?: number, fromDate?: string, toDate?: string, searchText?: string, taskName?: string }): Observable<any> {
    let url = `${this.apiUrl}?isActive=true`;

    if(!parameters?.pageNumber && !parameters?.limit && parameters?.fromDate && !parameters.toDate && !parameters.searchText && parameters.taskName) {
      const nextDay = new Date(parseInt(parameters.fromDate.split('-')[0]), parseInt(parameters.fromDate.split('-')[1])-1, parseInt(parameters.fromDate.split('-')[2])+3).toISOString().split('T')[0];
      return this.httpclient.get(`http://localhost:3000/api/v1/activities?taskName=${parameters.taskName}&startTime[gte]=${parameters.fromDate}&startTime[lt]=${nextDay}&isActive=true`, {withCredentials: true})
    }
  
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
    
    if (parameters?.searchText) {
      url += `&searchText=${parameters.searchText}`;
    }
  
    return this.httpclient.get<any>(url, { withCredentials: true });
}
  

  getOneActivity(id: string) {
    let apiUrl = "http://localhost:3000/api/v1/activities/";
    return this.httpclient.get(`${apiUrl}${id}`, {withCredentials: true});
  }

  createActivity(activity: Activity, userID?: string): Observable<any> {
    const apiUrl = `http://localhost:3000/api/v1/activities`;;
        const activityToSend = { ...activity, userID: userID };
        return this.httpclient.post(apiUrl, activityToSend, { withCredentials: true });
  }

  updateActivities(activity: Activity, id?: string): Observable<any> {
    if(!id) {
      throw new Error('Id is required');
    }
    const url = `http://localhost:3000/api/v1/activities/${id}`;
    return this.httpclient.patch(url, activity, {withCredentials: true});
  }

  deleteActivity(activityID: string): Observable<any>{
    const apiUrl = "http://localhost:3000/api/v1/activities/";

    console.log("Deleting activity with ID: " + activityID);

    return this.httpclient.delete(apiUrl+activityID, { withCredentials: true });
  }
    
  }



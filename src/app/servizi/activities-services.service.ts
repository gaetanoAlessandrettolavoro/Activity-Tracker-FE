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


  getActivities(parameter?:{pageNumber?: number, limit?: number, fromDate?: string, toDate?: string}): Observable<any> {
    let url = `${this.apiUrl}?isActive=true`;
  
    if(parameter?.limit){
      url += `&limit=${parameter.limit}&sort=-startTime`;
    }
    if(parameter?.pageNumber){
      url += `&page=${parameter.pageNumber}&sort=-startTime`;
    }

    if(parameter?.toDate && parameter?.fromDate){
      url += `&startTime[gte]=${parameter.fromDate}&endTime[lte]=${parameter.toDate}&sort=-startTime`;
    }
  
    return this.httpclient.get<any>(url, {withCredentials : true});
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



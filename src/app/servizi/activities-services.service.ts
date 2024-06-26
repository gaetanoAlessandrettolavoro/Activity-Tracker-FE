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


  getActivities(parameter?:{pageNumber?: number, limit?: number}): Observable<any> {
    if(parameter?.limit  && !parameter?.pageNumber){
      return this.httpclient.get<any>(`${this.apiUrl}?limit=${parameter?.limit}&isActive=true&sort=-startTime`, {withCredentials : true});
    }
    else if(parameter?.pageNumber && !parameter?.limit){
      return this.httpclient.get<any>(`${this.apiUrl}?page=${parameter?.pageNumber}&isActive=true&sort=-startTime`, {withCredentials : true});
    }
    if(parameter?.limit && parameter.pageNumber){
      return this.httpclient.get<any>(`${this.apiUrl}?limit=${parameter?.limit}&page=${parameter?.pageNumber}&isActive=true&sort=-startTime`, {withCredentials : true});
    }
    return this.httpclient.get<any>(`${this.apiUrl}?isActive=true`,{withCredentials : true})

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
    const apiUrl = `http://localhost:3000/api/v1/activities/${activityID}`;

    console.log("Deleting activity with ID: " + activityID);

    return this.httpclient.delete(apiUrl,{ withCredentials: true });
  }
    
  }

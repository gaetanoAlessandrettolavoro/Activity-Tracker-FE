import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteActivityService {

  constructor(private http: HttpClient) {}

  deleteActivity(activityID: string): Observable<any>{
    const apiUrl = "http://localhost:3000/api/v1/activities/";

    console.log("Deleting activity with ID: " + activityID);

    return this.http.delete(apiUrl+activityID, { withCredentials: true });
  }
}

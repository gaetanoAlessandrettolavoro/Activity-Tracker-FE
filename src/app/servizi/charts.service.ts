import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor(private http: HttpClient) { }

  hoursPerActivity() {
    const apiUrl = "http://localhost:3000/api/v1/activities/hoursPerActivity?isActive=true";

    const documentsToReturn: any[] = [];

    this.http.get(apiUrl, { withCredentials: true }).subscribe((res: any) => {
      for (let act of res.data.activities) {
        if(!!act.hours) {
          documentsToReturn.push(act)
        }
      }
    })

    return documentsToReturn;
  }
}

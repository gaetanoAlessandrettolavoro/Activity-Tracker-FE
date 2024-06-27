import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


export interface BasicData {
  labels: string[];
  datasets: [
    {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string[];
      borderWidth: number;
      userID: string[];
      _id: string[];
      taskName: string[];
    },
  ];
}

@Injectable({
  providedIn: 'root',
})
export class ChartsService {
  constructor(private http: HttpClient) {}

  hoursPerActivity(date: Date): Observable<BasicData[]> {
    const [year, month, day] = [date.getFullYear(), date.getMonth(), date.getDate()+1];
    const thisDay = new Date(year, month, day).toISOString().split('T')[0];
    const nextDay = new Date(year, month, day+1).toISOString().split('T')[0];
    const apiUrl =
      'http://localhost:3000/api/v1/activities/hoursPerActivity?isActive=true';
    return this.http.get(`${apiUrl}&startTime[gte]=${thisDay}&startTime[lt]=${nextDay}`, { withCredentials: true }).pipe(
      map((res: any) => {
        if (res && res.data && res.data.activities) {
          let basicData: BasicData = {
            labels: res.data.activities.map((act: any) => {
              return `${act.taskName}`}),
            datasets: [
              {
                label: 'Ore per attività',
                data: res.data.activities.map((act: any) => act.hours),
                backgroundColor: ['rgba(255, 159, 64, 0.2)'],
                borderColor: ['rgb(255, 159, 64)'],
                borderWidth: 1,
                userID: res.data.activities.map((act: any) => act.userID),
                _id: res.data.activities.map((act: any) => act._id),
                taskName: res.data.activities.map((act: any) => act.taskName)
              },
            ],
          };
          return [basicData];
        } else {
          throw new Error('Invalid response structure');
        }
      }),
      catchError((error) => {
        throw new Error(error.status)
      }),
    );
  }
}

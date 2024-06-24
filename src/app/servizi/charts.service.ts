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
    },
  ];
}

@Injectable({
  providedIn: 'root',
})
export class ChartsService {
  constructor(private http: HttpClient) {}

  hoursPerActivity(): Observable<BasicData[]> {
    const apiUrl =
      'http://localhost:3000/api/v1/activities/hoursPerActivity?isActive=true';
      
    return this.http.get(apiUrl, { withCredentials: true }).pipe(
      map((res: any) => {
        if (res && res.data && res.data.activities) {
          let basicData: BasicData = {
            labels: res.data.activities.map((act: any) => {
              return `${act.taskName} - ${act.userID}`}),
            datasets: [
              {
                label: 'Ore per attività',
                data: res.data.activities.map((act: any) => act.hours),
                backgroundColor: ['rgba(255, 159, 64, 0.2)'],
                borderColor: ['rgb(255, 159, 64)'],
                borderWidth: 1,
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

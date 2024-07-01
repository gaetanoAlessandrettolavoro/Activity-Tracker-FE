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

  hoursPerActivity(date: Date): Observable<BasicData[]> {
    const [year, month, day] = [date.getFullYear(), date.getMonth(), date.getDate()+1];
    const thisDay = new Date(year, month, day).toISOString().split('T')[0];
    const nextDay = new Date(year, month, day+1).toISOString().split('T')[0];
    const apiUrl =
      'http://localhost:3000/api/v1/activities/hoursPerActivity?isActive=true';
    return this.http.get(`${apiUrl}&startTime[gte]=${thisDay}&startTime[lt]=${nextDay}`, { withCredentials: true }).pipe(
      map((res: any) => {
        if (res && res.data && res.data.activities) {
          let taskLabels: string[] = [];
          for(let act of res.data.activities) {
            if(!taskLabels.includes(act.taskName)) {
              taskLabels.push(act.taskName);
            }
          }
          let hoursSum: number[] = [];
          for(let act of res.data.activities) {
            for(let i = 0; i < taskLabels.length; i++) {
              if(taskLabels[i] === act.taskName) {
                if(!hoursSum[i]) {
                  hoursSum[i] = parseFloat(act.hours);
                } else {
                  hoursSum[i] += parseFloat(act.hours);
                }
              }
            }
          }
          let basicData: BasicData = {
            labels: taskLabels,
            datasets: [
              {
                label: 'Ore per attività',
                data: hoursSum,
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

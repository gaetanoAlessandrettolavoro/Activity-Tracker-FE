import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { alias } from './defines';
import { Activity } from '../models/activityModel';


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

export interface PieData {
  labels: string[];
  datasets: [
    {
      data: number[];
      backgroundColor: string[];
      hoverBackgroundColor: string[];
    }
  ]
}

export interface StackedData {
  labels: string[];
  datasets: [
    {
      type: 'bar';
      label: string; //taskName
      backgroundColor: string;
      data: number[];
    }
  ]
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
      `http://${alias}:3000/api/v1/activities?isActive=true`;
    return this.http.get(`${apiUrl}&startTime[gte]=${thisDay}&startTime[lt]=${nextDay}`, { withCredentials: true }).pipe(
      map((res: any) => {
        if (res && res.data && res.data.document) {
          let taskLabels: string[] = [];
          for(let act of res.data.document) {
            if(!taskLabels.includes(act.taskName)) {
              taskLabels.push(act.taskName);
            }
          }
          let hoursSum: number[] = [];
          for(let act of res.data.document) {
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

  activitiesPerUsers(userID: string, fromDate: Date, toDate: Date): Observable<PieData>{
    const documentStyle = getComputedStyle(document.documentElement);
    const availableBgColors = [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--red-500'), documentStyle.getPropertyValue('--pink-500'), documentStyle.getPropertyValue('--teal-500'), documentStyle.getPropertyValue('--purple-500'), documentStyle.getPropertyValue('--orange-500')];
    const availableHBgColors =  [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--red-400'), documentStyle.getPropertyValue('--pink-400'), documentStyle.getPropertyValue('--teal-400'), documentStyle.getPropertyValue('--purple-400'), documentStyle.getPropertyValue('--orange-400')];
    const newFromDate = new Date(parseInt(fromDate.toLocaleDateString().split('/')[2]), parseInt(fromDate.toLocaleDateString().split('/')[1])-1, parseInt(fromDate.toLocaleDateString().split('/')[0])+1).toISOString().split('T')[0];
    const newToDate = new Date(parseInt(toDate.toLocaleDateString().split('/')[2]), parseInt(toDate.toLocaleDateString().split('/')[1])-1, parseInt(toDate.toLocaleDateString().split('/')[0])+1).toISOString().split('T')[0];
    console.log(newFromDate, newToDate)
    const apiUrl = `http://${alias}:3000/api/v1/users/${userID}/activities?startTime[gte]=${newFromDate}&startTime[lt]=${newToDate}`;

    return this.http.get(apiUrl, { withCredentials: true }).pipe(
      map((res: any) => {
        const activities: Activity[] = res.data.activities;
        let data: any;
        for (let i = 0; i< activities.length; i++) {
          let indexToUse;
          if(i > availableBgColors.length){
            let newIndex = i/availableBgColors.length;
            indexToUse = Math.floor(newIndex)
          } else {
            indexToUse = i;
          }
          if(i === 0){
            data = {
              //@ts-ignore
              labels: [`${activities[i].taskName} | ${activities[i].startTime.split('T')[1].slice(0,5).replace(activities[i].startTime.split('T')[1].slice(0,5).split(':')[0], (parseInt(activities[i].startTime.split('T')[1].slice(0,5).split(':')[0])+2).toString())} - ${activities[i].endTime.split('T')[1].slice(0,5).replace(activities[i].endTime.split('T')[1].slice(0,5).split(':')[0], (parseInt(activities[i].endTime.split('T')[1].slice(0,5).split(':')[0])+2).toString())}`],
              datasets: [
                {
                  data: [activities[i].hours],
                  backgroundColor: [availableBgColors[indexToUse]],
                  hoverBackgroundColor: [availableHBgColors[indexToUse]]
                }
              ]
            }
          } else {
            //@ts-ignore
            data.labels.push(`${activities[i].taskName} | ${activities[i].startTime.split('T')[1].slice(0,5).replace(activities[i].startTime.split('T')[1].slice(0,5).split(':')[0], (parseInt(activities[i].startTime.split('T')[1].slice(0,5).split(':')[0])+2).toString())} - ${activities[i].endTime.split('T')[1].slice(0,5).replace(activities[i].endTime.split('T')[1].slice(0,5).split(':')[0], (parseInt(activities[i].endTime.split('T')[1].slice(0,5).split(':')[0])+2).toString())}`);
            data.datasets[0].data.push(activities[i].hours);
            data.datasets[0].backgroundColor.push(availableBgColors[indexToUse]);
            data.datasets[0].hoverBackgroundColor.push(availableHBgColors[indexToUse]);
          }
          // console.log(data);
        };
        return data;
      }),
      catchError((error) => {
        throw new Error(error);
      })
    )
  }

  hoursPerUser(userID: string, fromDate: Date, toDate: Date): Observable<StackedData>{
    const documentStyle = getComputedStyle(document.documentElement);
    const availableBgColors =[documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--red-500'), documentStyle.getPropertyValue('--pink-500'), documentStyle.getPropertyValue('--teal-500')]
    const newFromDate = new Date(parseInt(fromDate.toLocaleDateString().split('/')[2]), parseInt(fromDate.toLocaleDateString().split('/')[1])-1, parseInt(fromDate.toLocaleDateString().split('/')[0])+1).toISOString().split('T')[0];
    const newToDate = new Date(parseInt(toDate.toLocaleDateString().split('/')[2]), parseInt(toDate.toLocaleDateString().split('/')[1])-1, parseInt(toDate.toLocaleDateString().split('/')[0])+1).toISOString().split('T')[0];
    const apiUrl = `http://${alias}:3000/api/v1/users/${userID}/activities?startTime[gte]=${newFromDate}&startTime[lt]=${newToDate}&isActive=true`;

    return this.http.get(apiUrl, { withCredentials: true }).pipe(
      map((res: any) => {
        console.log(res);
        let data: StackedData = {
          labels: [],
          datasets: [
            {
              type: 'bar',
              label: '',
              backgroundColor: '',
              data: []
            }
          ]
        };
        const activities: Activity[] = res.data.activities;
        let sums: any = {};
        let tasks: string[] = [];
        for(let act of activities){
          if(sums[`${act.taskName}|${act.startTime.toString().split('T')[0]}`] === undefined){
            //@ts-ignore
              sums[`${act.taskName}|${act.startTime.toString().split('T')[0]}`] = parseFloat(act.hours);
          } else {
            //@ts-ignore
            sums[`${act.taskName}|${act.startTime.toString().split('T')[0]}`] += parseFloat(act.hours);
          }
          if(!tasks.includes(act.taskName)){
            tasks.push(act.taskName);
          }
        }
        for (let i = 0; i < tasks.length; i++) {
          if(i === 0) {
            data.datasets[0].label = tasks[i];
          } else {
            data.datasets.push({
              type: 'bar',
              label: tasks[i],
              backgroundColor: '',
              data: []
            })
          }
        }
        for(let i = 0; i < activities.length; i++){
          if(data.labels.length > 0) {
            if(!data.labels.includes(activities[i].startTime.toString().split('T')[0])){
              data.labels = [...data.labels, activities[i].startTime.toString().split('T')[0]];
            }
          } 
          if(data.labels.length === 0) {
            //Si entra in questo if solamente alla prima attività
            data.labels.push(activities[i].startTime.toString().split('T')[0]);
            data.datasets[i].label = activities[i].taskName;
          }
        }
        const newDatasets = [...data.datasets];
        for (let label of data.labels) {
          for (let ds of newDatasets) {
            if(sums[`${ds.label}|${label}`]){
              ds.data.push(sums[`${ds.label}|${label}`]);
            } else {
              ds.data.push(0);
            }
          }
        }
        for (let i = 0; i < data.datasets.length; i++){
          let indexToUse;
          if(i > availableBgColors.length){
            let newIndex = i/availableBgColors.length;
            indexToUse = Math.floor(newIndex)
          } else {
            indexToUse = i;
          }
          data.datasets[i].backgroundColor = availableBgColors[indexToUse];
        }

        return data;
      }),
      catchError((error) => {
        console.error(error);
        throw new Error(error);
      })
    )
  }
}

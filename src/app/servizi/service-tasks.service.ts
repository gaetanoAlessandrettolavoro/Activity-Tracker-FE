import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/taskModel';
import { Observable } from 'rxjs';
import { TaskResponse } from '../models/taskResponseModel';
import { alias } from './defines';

@Injectable({
  providedIn: 'root'
})
export class ServiceTasksService { 
  token = localStorage.getItem('token');

  header= {authorization: `Bearer ${this.token}`}

  apiUrl = `http://${alias}:3000/api/v1/tasks`;

  constructor(private http: HttpClient) {}

  getSingleTask(id: string): Observable<TaskResponse> {
    return this.http.get<TaskResponse>(`${this.apiUrl}/${id}`, { headers: this.header });
  }

  getSingleTaskByName(taskName: string) {
    return this.http.get(`${this.apiUrl}?taskName=${taskName}`, { headers: this.header });
  }

  getAllTasks(parameter?: {isActive?: boolean, isNoActive?: boolean}): Observable<TaskResponse> {
    if(parameter?.isActive) {
      return this.http.get<TaskResponse>(`${this.apiUrl}?isActive=true`, { headers: this.header });
    }
    if(parameter?.isNoActive) {
      return this.http.get<TaskResponse>(`${this.apiUrl}?isActive=false`, { headers: this.header });
    }
    return this.http.get<TaskResponse>(`${this.apiUrl}`, { headers: this.header });
  }

  updateTask(taskUpdate: Task){
    return this.http.patch<any>(`${this.apiUrl}/${taskUpdate._id}`,taskUpdate,{ headers: this.header });
  }

  deleteTask(taskid:string){
    return this.http.delete<any>(`${this.apiUrl}/${taskid}`,{ headers: this.header });
  }
}



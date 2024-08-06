import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/taskModel';
import { Observable } from 'rxjs';
import { TaskResponse } from '../models/taskResponseModel';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceTasksService { 

  apiUrl = `http://${environment.recaptcha.baseUrl}:3000/api/v1/tasks`;

  constructor(private http: HttpClient) {}

  getSingleTask(id: string): Observable<TaskResponse> {
    return this.http.get<TaskResponse>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  getSingleTaskByName(taskName: string) {
    return this.http.get(`${this.apiUrl}?taskName=${taskName}`, { withCredentials: true });
  }

  getAllTasks(parameter?: {isActive?: boolean, isNoActive?: boolean}): Observable<TaskResponse> {
    if(parameter?.isActive) {
      return this.http.get<TaskResponse>(`${this.apiUrl}?isActive=true`, { withCredentials: true });
    }
    if(parameter?.isNoActive) {
      return this.http.get<TaskResponse>(`${this.apiUrl}?isActive=false`, { withCredentials: true });
    }
    return this.http.get<TaskResponse>(`${this.apiUrl}`, { withCredentials: true });
  }

  updateTask(taskUpdate: Task){
    return this.http.patch<any>(`${this.apiUrl}/${taskUpdate._id}`,taskUpdate,{ withCredentials: true });
  }

  deleteTask(taskid:string){
    return this.http.delete<any>(`${this.apiUrl}/${taskid}`,{ withCredentials: true });
  }
}



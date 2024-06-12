import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/taskModel';
import { Observable } from 'rxjs';
import { TaskResponse } from '../models/taskResponseModel';


@Injectable({
  providedIn: 'root'
})
export class TasksService {
  //When you use the service, you have to import "TaskResponse" in your component

  constructor(private http: HttpClient) {}

  getSingleTask(id: string): Observable<TaskResponse> {
    return this.http.get<TaskResponse>(`http://localhost:3000/api/v1/tasks/${id}`, { withCredentials: true });
  }

  getAllTasks(): Observable<TaskResponse> {
    return this.http.get<TaskResponse>('http://localhost:3000/api/v1/tasks', { withCredentials: true });
  }
}

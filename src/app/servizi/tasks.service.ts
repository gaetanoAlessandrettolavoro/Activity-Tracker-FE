import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/taskModel';
import { Observable } from 'rxjs';

interface TaskResponse {
  data: {
  document: Task[];
  };
  }

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) {}

  getSingleTask(id: string) {}

  getAllTasks(): Observable<TaskResponse> {
    return this.http.get<TaskResponse>('http://localhost:3000/api/v1/tasks', { withCredentials: true });
  }
}

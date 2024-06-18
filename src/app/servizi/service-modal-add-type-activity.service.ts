import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceModalAddTypeActivityService {

  private apiUrl = 'http://localhost:3000/api/v1/tasks';  // URL dell'API

  constructor(private http: HttpClient) {}
   
    addTypeActivity(typeActivityData: string) {
      return this.http.post(this.apiUrl, {taskName:typeActivityData},{withCredentials:true});
    }
  }


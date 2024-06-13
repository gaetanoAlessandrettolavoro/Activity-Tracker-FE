import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImpostNewpasswordUserAddBackpasswordService {
  private apiUrl = 'http://127.0.0.1:3000/api/v1/users/updateMyPassword '  // URL dell'API
  userForm: any;

  constructor(private http: HttpClient) { }

  changePassword(userId: string, oldPassword: string, newPassword: string): Observable<any> {
    const body = {
      oldPassword: oldPassword,
      newPassword: newPassword
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.patch<any>(`http://127.0.0.1:3000/api/v1/users/updateMyPassword`, { password: this.userForm.value.password,passwordConfirm: this.userForm.value.passwordc });
  }
}



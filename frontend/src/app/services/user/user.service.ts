import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from 'src/app/model/user/user';

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };

// const httpOptionsUsingUrlEncoded = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
// };

@Injectable({
  providedIn: 'root'
})
export class UserService {
  endPoint: string = 'http://localhost:8080/api/users';

  constructor(private httpClient: HttpClient) { }

  getUsers() {
    return this.httpClient.get(this.endPoint);
  }

  getUser(email: any): Observable<User> {
    let url = `${this.endPoint}/${email}`;
    return this.httpClient.get<User>(url);
  }

  postUser(user: any, blob: any) {
    let formData = new FormData();
    formData.append("nick_name", user.nickName);
    formData.append("user_code", user.nickName + '12345');
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("file", blob);
    // formData.forEach(u => console.log(u));
    return this.httpClient.post(this.endPoint, formData);
  }

  deleteUser(id: number): Observable<User> {
    let url = `${this.endPoint}/${id}`;
    return this.httpClient.delete<User>(url);
  }

  updateUser(password: string, blob: any, user: User){
    console.log(user);
    console.log(blob);
    console.log(password);
    
    let formData = new FormData();
    formData.append("nick_name", user.nickName);
    formData.append("user_code", user.nickName + '12345');
    formData.append("email", user.email);
    formData.append("password", password);
    formData.append("file", blob);
    console.log(user.id);
    
    let url = `${this.endPoint}/${user.id}`;
    console.log(this.httpClient.put(url, formData));
    
    return this.httpClient.put(url, formData);
  }
}
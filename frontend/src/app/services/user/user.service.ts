import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from 'src/app/model/user/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const httpOptionsUsingUrlEncoded = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  endPoint: string = 'http://localhost:8080/api/users';

  constructor(private httpClient: HttpClient) { }

  getUsers(){
    return this.httpClient.get(this.endPoint);
  }

  getUser(user: any): Observable<User> {
    let url = `${this.endPoint}/${user.email}`;
    return this.httpClient.get<User>(url);
  }

  postUser(user: any, blob:any) {
    let formData = new FormData();
    formData.append("nick_name", user.nickName);
    formData.append("user_code", user.nickName + '12345');
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("file", blob);
    formData.forEach(u => console.log(u));    
    return this.httpClient.post(this.endPoint, formData);
  }

  deleteUser(id:number): Observable<User> {
    let url = `${this.endPoint}?id=${id}`;
    return this.httpClient.delete<User>(url);
  }

  updateUser(password: string, user:User): Observable<User> {
    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("nickName", user.nickName);
    bodyEncoded.append("codeUser", user.nickName + '12345');
    bodyEncoded.append("email", user.email);
    bodyEncoded.append("password", password);
    let body = bodyEncoded.toString();
    let url = `${this.endPoint}/${user.id}`;
    return this.httpClient.put<User>(url, body, httpOptionsUsingUrlEncoded);
  }
}